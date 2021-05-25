/* plus alpha:
    - overview animation / calculation
    - logo animation
    - arrow micro interaction
    - sound
*/

/*
*
* Initial page load
* Resize Events
* Key Events
* UI Interaction
* siteScrollHandler()
* horizontalSlide()
* horizontalSlide()
* createSiteIndex()
* getSubIndex()
* intersectionObserver()
* inArray()
* updateUI()
* updateTitle()
* updateNavigation()
* horizontalScroll()
* setHorizontalScrollPosition()
* updateURL()
* imageInterval()
* imageDimension()
* checkScrollPosition()
* isTouchDevice()
* siteInit()
*
*/


// Initial page load
let indexAll = '';
let indexCurrent = 0;
let indexPrevious = '';
let indexDest = 0;
let indexSub = '';
let indexCurrentSub = 0;
let ms_vw = Math.max( document.documentElement.clientWidth || 0, window.innerWidth || 0 );
let ms_vh = Math.max( document.documentElement.clientHeight || 0, window.innerHeight || 0 );
let imageClock = '';
let scrollableElements = [ 'p', 'collab-content' ]

document.addEventListener(　'DOMContentLoaded', (　event　) => {
	
    siteInit()
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
			
            // intersectionRect is checking if an element at least covers half the viewport, 
            // (for cases where entry is larger than vp)
			if ( entry.isIntersecting && entry.intersectionRect.height >= ( ms_vh / 2 ) ){
                    
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
    //if( indexSub.length === 1 ){
    // limit the horizontal arrows to the chapter template    
    if( indexAll[ indexCurrent ].classList.contains( 'tmpl-chapter' ) ){
        document.body.classList.remove( 'no-x-arrows' )
    } else{ 
        document.body.classList.add( 'no-x-arrows' )
    }

    // make sure to fire the below functionality only once per section
    if( indexPrevious === indexCurrent ){ return }
    indexPrevious = indexCurrent

    // update section title
    updateTitle( indexAll[ indexCurrent ] )
    
    // update navigation
    updateNavigation( indexAll[ indexCurrent ] )

    // update when destination is reached and scrolling has stopped
    if( indexDest.id === indexAll[ indexCurrent ].id ){
        updateURL()
        // reset x position of main sections
        setHorizontalScrollPosition()
        indexDest = 0
    }
    
    // init
    horizontalScroll()
    imageInterval()
    displayMediaPlayer()
}


// Updates the UI title
function updateTitle( ele ){

    const titleContainer = document.querySelector( '#ui-title' )
    const titleContent = ele.querySelector( 'h1' ).outerHTML
    titleContainer.innerHTML = titleContent

    // conditional opacity transition
//    if( indexCurrent === 0 ){ return }

    titleContainer.style.opacity = 1;
    // remove opacity after a delay
    setTimeout( () => {
        titleContainer.style.opacity = 0;
    }, 1000 );

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

    // handles the scroll event
    function horizotnalScrollHandler( event ) {

        const parentClassList = [... event.target.parentElement.classList]
        const collabItem = inArray( [ 'collab-content' ], parentClassList, false )   
        const scrollingElement = collabItem ? event.target.parentElement : event.target
        const scrollingElementTagName = scrollingElement.tagName.toLowerCase()
        const scrollingElementClassList = scrollingElement.classList
        const isScrollableElement = scrollingElementTagName === 'p' || scrollingElementClassList.contains( 'collab-content' ) ? true : false
        const isAtBottom = scrollingElement.classList.contains( 'bottom' )
        const isAtTop = scrollingElement.classList.contains( 'top' )

        // create a chain scrolling effect: for elements that are supposed to scroll normal 
        if( isScrollableElement && isAtBottom === false && isAtTop === false ){    
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
        const threshold = 10 // to prevent bounce scrolling in safari

        // bottom
        if( ele.scrollHeight - ele.scrollTop - threshold <= ele.getBoundingClientRect().height ){
            ele.classList.add( 'bottom' )
        } else{
            ele.classList.remove( 'bottom' )
        }

        // top
        if( ele.scrollTop <= threshold ){
            ele.classList.add( 'top' )
        } else{
            ele.classList.remove( 'top' )
        }
    }

    // init
    selection.forEach( item =>{

        // take parent element of p when it is a collaborator
        const parentClassList = item.parentElement.classList
        if( parentClassList.contains( 'collab-content' ) ){
            item = item.parentElement
        }
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


// actions for initial page load
function siteInit(){
    
    document.body.addEventListener( 'click', () => {

        document.body.classList.add( 'initialized' )

    }, { once: true } )
}


// handles media player
function displayMediaPlayer(){

    const dataTitle = indexAll[ indexCurrent ].dataset.title
    const player = indexAll[ indexCurrent ].querySelector( '.entry-content .ms-player-container' )
    const UIplayer = document.querySelector( '#ui-player' )
    displayHandler()
    
    function displayHandler(){
        const UIplayerActive = UIplayer.querySelector( `.ms-player-container[data-title=\"${dataTitle}\"]` )

        // hide all players
        UIplayer.querySelectorAll( '.ms-player-container' ).forEach( item =>{
            item.style.display = 'none'
            //pausePlayer()
        })

        // show active player
        if( UIplayerActive ){
            UIplayerActive.style.display = 'block'
        }
    }

    // initial move player to UI layer
    if( player == null ) { return }
    
    player.dataset.title = dataTitle
    UIplayer.appendChild( player )
    displayHandler()
}


// mediaplayer element handler
function pausePlayer() {

    //mejs.players.mep_0.pause()
    const players = mejs.players
    console.log( players )

    
    Object.entries( players ).forEach( item =>{
        console.log( item )
        console.log( item.pause() )
        item.pause()
    })

}