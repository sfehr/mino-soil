/* Todo:
    – initial page load
    - push state to URI
    - section UI title fade in out animation
    - overview animation / calculation ?
    - logo animation
    – touch events (scroll) ?
    - arrow micro interaction
    - media queries
    - sound
    - horizontal scroll  (collab-content) bug
    - resize touchmove return
*/


// Initial page load
let indexAll = '';
let indexCurrent = 0;
let indexDest = 0;
let indexSub = '';
let indexCurrentSub = 0;
let ms_vw = Math.max( document.documentElement.clientWidth || 0, window.innerWidth || 0 );
let ms_vh = Math.max( document.documentElement.clientHeight || 0, window.innerHeight || 0 );
let imageClock = '';
let scrollableElements = [ 'p', '.collab-content' ]

document.addEventListener(　'DOMContentLoaded', (　event　) => {
	
    createSiteIndex()
    intersectionObserver()
    updateUI()
    imageDimension()
    checkScrollPosition()
    
}, false );


// Resize events
window.addEventListener(　'resize', (　event　) => {
    
    // update viewport dimensions
    ms_vw = Math.max( document.documentElement.clientWidth || 0, window.innerWidth || 0 );
    ms_vh = Math.max( document.documentElement.clientHeight || 0, window.innerHeight || 0 );

    // update viewport scroll position
    if( !isTouchDevice() ){
        siteScrollHandler( indexAll[ indexCurrent ] )
    }


    // recaluclate image dimensions
    imageDimension();
    
}, false );


// PopStates events
/*
window.onpopstate = function(){

    console.log( 'pop state change' )

    // get element from hash
    const newDest = document.querySelector( window.location.hash )
    indexCurrent = indexAll.indexOf( newDest )
    // scroll to element
    siteScrollHandler( indexAll[ indexCurrent ] )

    console.log( 'newDest', newDest )
    console.log( 'indexAll', indexAll )
}
*/


// Keyboard events
document.addEventListener( 'keyup', event => {

    let dest = ''

    // include only arrow up/down keys
    if( event.key === 'ArrowUp' || event.key === 'ArrowDown' || 
        event.key === 'ArrowLeft' || event.key === 'ArrowRight' ) { 
         
        let horizontal = null

        // Up
        if( event.key === 'ArrowUp' ) { 
            dest = indexAll[ indexCurrent - 1 ]
        }
        // Down
        if( event.key === 'ArrowDown' ) { 
            dest = indexAll[ indexCurrent + 1 ]
        }
        // Right
        if( event.key === 'ArrowRight' ) { 
            dest = indexSub[ indexCurrentSub + 1 ]
            horizontal = true
        }
        // Left
        if( event.key === 'ArrowLeft' ) { 
            dest = indexSub[ indexCurrentSub - 1 ]
            horizontal = true
        }
        
        // any other key
        if( dest == undefined ){ return }

        if( horizontal ){ 
            horizontalSlide( dest ) 
            return
        }
        
        siteScrollHandler( dest )
    }
})


// UI interaction
document.querySelectorAll( '.ui-item, .nav-item, .ui-area, #site-logo' ).forEach( item =>{
 
    // click event
    item.addEventListener( 'click', event => {

        event.preventDefault()

        const classListArray = [...event.target.classList]
        const target = event.target

        
        let targetHash = document.querySelector( target.hash )

        // home
        if( item.id === 'site-logo' ){
            targetHash = indexAll[ 0 ]
        }

        // overview
        if( inArray( [ 'overview' ], classListArray, false ) ){
            document.body.classList.toggle( 'view-overview' )
            return
        }

        // image accordeon
        if( inArray( [ 'ui-area' ], classListArray, false ) ){
            // check if its a collaborator or a chapter
            const collaborator = event.target.closest( '.collaborator' )
            const ancestor = collaborator ? collaborator : indexAll[ indexCurrent ]
            // toggle css class
            ancestor.classList.toggle( 'unfolded' )
            // call image dimension to recalculate
            imageDimension()
            // call mouse wheel function
            horizontalScroll()
            return
        }

        // arrow down
        if( inArray( [ 'arrow', 'down' ], classListArray, true ) ){
            targetHash = indexAll[ indexCurrent + 1 ]
        }

        // arrow up
        if( inArray( [ 'arrow', 'up' ], classListArray, true ) ){
            targetHash = indexAll[ indexCurrent - 1 ]
        }

        // arrow right
        if( inArray( [ 'arrow', 'right' ], classListArray, true ) ){
            targetHash = indexSub[ indexCurrentSub + 1 ]
            horizontalSlide( targetHash )
            return
        }

        // arrow left
        if( inArray( [ 'arrow', 'left' ], classListArray, true ) ){
            targetHash = indexSub[ indexCurrentSub - 1 ]
            horizontalSlide( targetHash )
            return
        }        

        siteScrollHandler( targetHash )
    })
} )


// Scrolls to given destination
function siteScrollHandler( dest ) {

    indexDest = dest
    const offsetTop = dest.offsetTop
   
    scroll({
      top: offsetTop,
      behavior: "smooth"
    });
}


// horizontally slides to given destination
function horizontalSlide( dest ) {
    
    // units
    const mainSection = indexAll[ indexCurrent ]
    const positionX = mainSection.dataset.x || 0
    const distX = dest.getBoundingClientRect().left
    const max = positionX - distX

    // init
    mainSection.classList.add( 'slide-transition' )
    mainSection.style.transform = `translateX(${max}px)`
    mainSection.dataset.x = max

    // for updating scroll position
    horizontalScroll()
}


// Creates an index of page sections
function createSiteIndex(){

    const nodeListMain = document.querySelectorAll( '.section.main' )
    indexAll = [...nodeListMain]

}


// updates the sub section index
function getSubIndex(){

    const nodeListSub = indexAll[ indexCurrent ].querySelectorAll( '.section.sub' )
    indexSub = [...nodeListSub]
}


// Checks which section of the site is being viewed
function intersectionObserver(){

    // Select elements to be observed
	//let boxElementAll = document.querySelectorAll( '.section.main' )
	let boxElementAll = document.querySelectorAll( '.section' )
    let indexOld = 0;

    // initiate
    createObserver();
	
    // Initiate observer
	function createObserver() {	
		let observer;
		let options = {
			root: null,
            // rootMargin: '-100px -100px -100px -100px',
			rootMargin: '0px',
			threshold: buildThresholdList()
	  };
		observer = new IntersectionObserver( handleIntersect, options );
		boxElementAll.forEach( boxElement => observer.observe( boxElement ) );
	}
	
    // Theshhold list contains number of steps for checking
	function buildThresholdList() {
		let thresholds = [];
		let numSteps = 100;

		for ( let i = 1.0; i <= numSteps; i++) {
			let ratio = i/numSteps;
			thresholds.push( ratio );
		}

		thresholds.push( 0 );
		return thresholds;
	}
	
    // Intersection handler 
	function handleIntersect( entries, observer ) {
		
		entries.forEach( ( entry ) => {
			
            // 0.25 a deeper value has a higher tolerance (needed when element is bigger than viewport)
			if ( entry.isIntersecting && entry.intersectionRatio >= 0.25 ){
                
                // check if its a main section
                if( entry.target.classList.contains( 'main' ) ){
                    indexCurrent = indexAll.indexOf( entry.target )
                }

                // check if its a sub section
                if( entry.target.classList.contains( 'sub' ) ){
                    indexAll[ indexCurrent ].classList.remove( 'slide-transition' ) // added by horizontalSlide()
                    indexCurrentSub = indexSub.indexOf( entry.target )
                    updateUI()
                }

                // avoid multiple updates within same section (while scroll animation is going)
                if( indexOld !== indexCurrent ){
                    indexOld = indexCurrent
                    updateUI()

                }                
			}         
		});
	}	
}


// Function to check if one or mutliple values are in an array
function inArray( needle, haystack, matchAll = false ) {
    if ( matchAll ) {
        return needle.every( i => haystack.includes( i ) )
    } else {
        return needle.some( i => haystack.includes( i ) )
    }
}


// Updates the UI
function updateUI(){

    getSubIndex()

    // MAIN SECTION
    // first section
    if ( indexCurrent === 0 ){
        document.body.classList.remove( 'view-section-last' )
        document.body.classList.add( 'view-section-first' )
    }
    // last section
    if ( indexCurrent === (indexAll.length - 1) ){
        document.body.classList.remove( 'view-section-first' )
        document.body.classList.add( 'view-section-last' )
    }
    // middle sections
    if ( !( indexCurrent === (indexAll.length - 1) ) && !(indexCurrent === 0 ) ){
        document.body.classList.remove( 'view-section-first' )
        document.body.classList.remove( 'view-section-last' )
    }

    // SUB SECTION
    // first sub section
    if ( indexCurrentSub === 0 ){
        document.body.classList.remove( 'view-sub-last' )
        document.body.classList.add( 'view-sub-first' )
    }
    // last sub section
    if ( indexCurrentSub === (indexSub.length - 1) ){
        document.body.classList.remove( 'view-sub-first' )
        document.body.classList.add( 'view-sub-last' )
    }
    // middle sub sections
    if ( !( indexCurrentSub === (indexSub.length - 1) ) && !(indexCurrentSub === 0 ) ){
        document.body.classList.remove( 'view-sub-first' )
        document.body.classList.remove( 'view-sub-last' )
    }
    // if only 1 sub section exists no horizontal arrows are needed
    if( indexSub.length === 1 ){
        document.body.classList.add( 'no-x-arrows' )
    } else{ 
        document.body.classList.remove( 'no-x-arrows' )
    }

    // update section title
    updateTitle( indexAll[ indexCurrent ] )
    
    // update navigation
    updateNavigation( indexAll[ indexCurrent ] )

    // update hash location, if destination is reached and scrolling has stopped
    if( indexDest.id === indexAll[ indexCurrent ].id ){
        updateURL()
        // reset x position of main sections
        setHorizontalScrollPosition()
        indexDest = 0
    }
    
    // init
    horizontalScroll()
    imageInterval()
}


// Updates the UI title
function updateTitle( ele ){

    const titleContainer = document.querySelector( '#ui-title' )
    const title = ele.querySelector( 'h1' ).outerHTML
    titleContainer.innerHTML = title

}


// Updates Navigation
function updateNavigation( ele ){
    
    // reset current item
    document.querySelectorAll( '#site-navigation .menu-item' ).forEach( item =>{
        item.classList.remove( 'current-item' )
    })

    // home is not displayed in the navigation
    if( indexCurrent === 0 ) { return } 
    
    // set current item
    const title = ele.dataset.title
    const currentMenuItem = document.querySelector( `#site-navigation [data-title=\"${title}\"]` ).parentElement // in case of error: forgot to add the new section to the menu?
    currentMenuItem.classList.add( 'current-item' )

}


// Horizontal scroll
function horizontalScroll(){

    // return if its a touchdevice
/*    if( isTouchDevice() ) { return } */

    // handles the scroll event
    function horizotnalScrollHandler( event ) {
    
        //const scrollDirection = ( (transform + event.deltaY * -0.5) > transform ) ? 'left' : 'right'
        const tagName = event.target.tagName.toLowerCase()
        const isAtBottom = event.target.classList.contains( 'bottom' )
        const isAtTop = event.target.classList.contains( 'top' )

        //console.log( tagName )
        //console.log( event.target.parentElement )

        // create a chain scrolling
        //if( tagName === 'p' && isAtBottom === false && isAtTop === false ){
        if( inArray( [ tagName ], scrollableElements, false ) && isAtBottom === false && isAtTop === false ){    
            return
        }

        //event.preventDefault();

        transform += event.deltaY * -0.5
        // Restrict transform
        transform = Math.max( Math.min( 0, transform ), -max ) // negative number for vp to moving to the right
        // Apply transform
        ele.style.transform = `translateX(${transform}px)`
        ele.dataset.x = transform
      }
    
    // units
    const ele = indexAll[ indexCurrent ]
    const containerWidth = ele.scrollWidth //ele.getBoundingClientRect().width
    const max = containerWidth - ms_vw;
    let transform = ele.dataset.x || 0

    // init
    transform = Number( transform ) // to make sure its a number
    transform = Math.max( Math.min( 0, transform ), -max ) // ristrict transform in case scrollWidth had changed
    ele.style.transform = `translateX(${transform}px)`
    ele.onwheel = horizotnalScrollHandler
//    document.onwheel = horizotnalScrollHandler
}


// Horizontal scroll
function setHorizontalScrollPosition(){
    
    const position = 0
    const mainSection = document.querySelectorAll( '[data-x]' )

    mainSection.forEach( ( section ) => {
        // set position
        section.style.transform = `translateX(${position}px)`
        section.dataset.x = position
    })

    // remove/reset arrow classes
    document.body.classList.remove( 'no-x-arrows' )
    document.body.classList.remove( 'view-sub-last' )
    document.body.classList.remove( 'view-sub-first' )
    
}


// Handles push stastes updates
function updateURL(){

    const updatedURI = `#${indexAll[ indexCurrent ].dataset.title}`
    // update history
    history.pushState( '', '', updatedURI )

}


// displays images in an interval
function imageInterval(){

    // clear eventually pre existing intervals
    clearInterval( imageClock )

    const imageContainer = indexAll[ indexCurrent ]
    const mediaItems = [...imageContainer.querySelectorAll( '.entry-media' ) ]
    let tick = 0
    let index = 0

    // exit if a different page is active or if mediaItems are empty
    if( !imageContainer.classList.contains( 'tmpl-teaser' ) || mediaItems.length == 0 ){ 
        return 
    }
    
    // intervall based executed code 
    function imageIntervalHandler() {

        mediaItems.forEach( ( item ) => {
            item.style.opacity = 0
        })

        if( tick % 2 == 0 ){
            mediaItems[ index ].style.opacity = 1
            index++
        }

        if( index == mediaItems.length ){
            index = 0
        }

        tick++
    }

    // init
    imageClock = setInterval( imageIntervalHandler, 2000 )
}


// handles the image dimension
function imageDimension(){

    const images = document.querySelectorAll( 'img' )
    
    if( images == undefined ){ return }

    // loop throught the images and recalculate its dimesnions
    images.forEach( item => {
/*
        item.removeAttribute( 'width' )
        item.removeAttribute( 'height' )
*/        
        // get dimensions
        const imgW = item.getAttribute( 'width' )
        const imgH = item.getAttribute( 'height' )
        const containerHeight = Math.floor( item.parentElement.getBoundingClientRect().height );

        // only recalculate images that have changed (unfolded state)
        if( containerHeight == imgH ){ return } 

        const orientation = imgW > imgH ? 'landscape' : 'portrait'
        const imageRatio = (orientation === 'landscape') ? imgW / imgH : imgH / imgW;
        const imageWidth = (orientation === 'landscape') ? containerHeight * imageRatio : containerHeight / imageRatio;
        const imageHeight = containerHeight;

        // set new dimensions
        item.width = imageWidth
        item.height = imageHeight

    })
}


// checks wether a scrollable element has reached its bottom
function checkScrollPosition(){

    const selection = document.querySelectorAll( scrollableElements )

    function checkHandler( event ){

        const ele = event.target || event

        // bottom
        if( ele.scrollHeight - ele.scrollTop === ele.getBoundingClientRect().height ){
            ele.classList.add( 'bottom' )
        } else{
            ele.classList.remove( 'bottom' )
        }

        // top
        if( ele.scrollTop === 0 ){
            ele.classList.add( 'top' )
        } else{
            ele.classList.remove( 'top' )
        }
    }

    // init
    selection.forEach( item =>{
        // reset
        item.onscroll = null
        // initial check
        checkHandler( item )
        // add scroll event listener
        item.onscroll = checkHandler
    })
}


// check for touch device
function isTouchDevice() {
    return (('ontouchstart' in window) ||
        (navigator.maxTouchPoints > 0) ||
        (navigator.msMaxTouchPoints > 0));
}