/*!
 * Navi - Navigation Panel
 * (c) 2017 Katy D M Morris
 * 
 *
 * http://katy-morris.com/navi
 * http://github.com/katy-morris/navi
 *
 * VERSION 1.0
 */

(function (window) {

  /*-----------------DEFAULT PROPS------------------*/

  //default properties
  var navProps = {
      custom_props: {
        menu_title: "Menu",
        color: "gray",
        mobileWindowWidth: 768,
        navWidth: "50%",
        panel_position: "right",
      },
      hamburger_props: {
        provide_hamburger: true
      },
      internal_props: {
        navbarEl: null,
        hamburger_el: null,
        raw_width: null,
        nav_width_type: null,
        vendor_prefix: null,
      }
  }

  /*----------------GENERAL FUNCTIONS----------------*/

  //check for class
  function hasClass(element, cls) {
      return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }


  function GetVendorPrefix(arrayOfPrefixes) {
    var tmp = document.createElement("div");
    var result = "";

    for (var i = 0; i < arrayOfPrefixes.length; ++i) {
    if (typeof tmp.style[arrayOfPrefixes[i]] != 'undefined') {
      result = arrayOfPrefixes[i];

    } else {
      debugger
      result = null;
    }

    return result;
    }
  }

  /*-----------------NAVI FUNCTIONS------------------*/


  /*----MAIN PIPELINE----*/

  function goNavi(props) {

    //set custom properties
    var x;
    for (x in props) {
      navProps.custom_props[x] = props[x];
    }

    //get user's navbar
    navProps.internal_props.navbarEl = document.getElementById("navi");

    //sort out the user's input type for nav width for use and save data
    var navWidthInt = parseInt(navProps.custom_props.navWidth);
    var navWidthType = navProps.custom_props.navWidth.match(/\D/g,'').join("");
    navProps.internal_props.raw_width = navWidthInt;
    navProps.internal_props.nav_width_type = navWidthType;

    buildHamburger();

    navProps.internal_props.vendor_prefix = GetVendorPrefix(["transition", "msTransition", "MozTransition", "WebkitTransition", "OTransition"]);

    buildNavigationBase();
    checkForActivation();
  }
  window.goNavi = goNavi;

  /*-----------------FACTORY------------------*/

//runs once on document creation
  function buildNavigationBase() {

    //create menu title
    var navFirstChild = navProps.internal_props.navbarEl.children[0];
    var menu_title = document.createElement('div');
    menu_title.setAttribute("id", "navi-menu-title");
    menu_title.innerHTML = navProps.custom_props.menu_title;
    navProps.internal_props.navbarEl.prepend(menu_title);

    //set nav position
    if (navProps.custom_props.panel_position == "right") {
      navProps.internal_props.navbarEl.className += " right-panel";
      navProps.internal_props.navbarEl.style.right = navProps.internal_props.raw_width + navProps.internal_props.nav_width_type;
    } else if (navProps.custom_props.panel_position == "left") {
      navProps.internal_props.navbarEl.className += " left-panel";
      navProps.internal_props.navbarEl.style.left = navProps.internal_props.raw_width + navProps.internal_props.nav_width_type;
    }
  }

  function buildHamburger() {
    if (navProps.hamburger_props.provide_hamburger == true) {

      var burgerArr = [];

      var burgerParent = document.createElement('div');
      burgerParent.setAttribute("id", "navi-event-init");
      burgerParent.className = "navi-burger-container nav-closed";

      var burgerChild1 = document.createElement('div');
      burgerChild1.className = "line";
      burgerChild1.setAttribute("id", "line-1");
      burgerArr.push(burgerChild1);

      var burgerChild2 = document.createElement('div');
      burgerChild2.className = "line";
      burgerChild2.setAttribute("id", "line-2");
      burgerArr.push(burgerChild2);

      var burgerChild3 = document.createElement('div');
      burgerChild3.className = "line";
      burgerChild3.setAttribute("id", "line-3");
      burgerArr.push(burgerChild3);

      for (i = 0; i < burgerArr.length; i++) { 
          burgerParent.appendChild(burgerArr[i]);
      }
      //append the newly created hamburger
      navProps.internal_props.navbarEl.parentNode.insertBefore(burgerParent, navProps.internal_props.navbarEl.nextSibling);
      
      //save the newly created hamburger
      navProps.internal_props.hamburgerEl = burgerParent

    } else {

    }
  }

  //runs on resize
  //set styles when panel is activated
  function setPanelOnlyAttributes() {
    if (window.outerWidth < navProps.custom_props.mobileWindowWidth) {
      navProps.internal_props.navbarEl.style.width = navProps.custom_props.navWidth;
        //set nav position left/right
      if (navProps.custom_props.panel_position == "right") {
        navProps.internal_props.navbarEl.style.right = (navProps.internal_props.raw_width * -1) + navProps.internal_props.nav_width_type;
      } else if (navProps.custom_props.panel_position == "left") {
        navProps.internal_props.navbarEl.style.left = (navProps.internal_props.raw_width * -1) + navProps.internal_props.nav_width_type;
      }
    } 
  }

  /*--------------------EVENTS----------------------*/

  function openNav() {
    if (navProps.internal_props.vendor_prefix != null) {
      debugger
      navProps.internal_props.navbarEl.style[navProps.internal_props.vendor_prefix].style.transform = "translate(60px,0)";
    }
  }

  function closeNav() {
    
  }

  /*-----------------RESIZE EVENTS------------------*/

  //check at end of preparation or resize if navigation should show
  function checkForActivation() {
    var windowWidth = window.outerWidth;
    var activated = hasClass(navProps.internal_props.navbarEl, 'nav-activated');

    if (windowWidth < navProps.custom_props.mobileWindowWidth && activated == false) {
      navProps.internal_props.navbarEl.className += " nav-activated";
      navProps.internal_props.hamburgerEl.style.display = "block";
      setPanelOnlyAttributes();
    } else if (activated == true && windowWidth > navProps.custom_props.mobileWindowWidth) {
      navProps.internal_props.navbarEl.className = navProps.internal_props.navbarEl.className.replace(new RegExp('(?:^|\\s)'+ 'nav-activated' + '(?:\\s|$)'), ' ');
      navProps.internal_props.navbarEl.removeAttribute('style');
      navProps.internal_props.hamburgerEl.removeAttribute('style');
    }
  }

  /*-----------------EVENT LISTENERS------------------*/

  document.querySelector('body').addEventListener("click", function(event){

    if (event.target.id.toLowerCase() === 'navi-event-init') {
      var isOpen = hasClass(navProps.internal_props.navbarEl, 'nav-open');
      if (isOpen == false) {
        openNav();
      } else if (isOpen == true) {
        closeNav();
      }

    }
  });


  /*-----------------DOM LOADED------------------*/
  /*---------------------------------------------*/
  document.addEventListener("DOMContentLoaded", function(){

  });


  /*-----------------RESIZE------------------*/
  /*-----------------------------------------*/
  window.onresize = function(event) {
      checkForActivation();
  };
} (window))
