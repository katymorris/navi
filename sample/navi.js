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
  var userProps = {
      navbarEl: null,
      menuTitle: "Menu",
      color: "gray",
      mobileWindowWidth: 768,
      navWidth: "50%",
      panelPosition: "left"
  }

  /*----------------GENERAL FUNCTIONS----------------*/

  //check for class
  function hasClass(element, cls) {
      return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
  }

  /*-----------------NAVI FUNCTIONS------------------*/


  /*----MAIN PIPELINE----*/

  function goNavi(props) {

    //set custom properties
    var x;
    for (x in props) {
      userProps[x] = props[x];
    }

    //get user's navbar
    userProps.navbarEl = document.getElementById("navi");

    buildNavigationBase();


    checkForActivation();
  }
  window.goNavi = goNavi;

  /*-----------------FACTORY------------------*/

//runs once on document creation
  function buildNavigationBase() {

    //create menu title
    var navFirstChild = userProps.navbarEl.children[0];
    var menuTitle = document.createElement('div');
    menuTitle.setAttribute("id", "navi-menu-title");
    menuTitle.innerHTML = userProps.menuTitle;
    userProps.navbarEl.prepend(menuTitle);

    //sort out the user's input for nav width for use
    var navWidthInt = parseInt(userProps.navWidth) * -1;
    var navWidthType = userProps.navWidth.match(/\D/g,'').join("");
    var finalNavWidthVal = navWidthInt + navWidthType;

    //set nav position
    if (userProps.panelPosition == "right") {
      userProps.navbarEl.className += " right-panel";
      userProps.navbarEl.style.right = finalNavWidthVal
    } else if (userProps.panelPosition == "left") {
      userProps.navbarEl.className += " left-panel";
      userProps.navbarEl.style.left = finalNavWidthVal
    }

  setMobileAttributes();

  }

  //runs on resize
  //set styles on mobile
  function setMobileAttributes() {
    if (window.outerWidth < userProps.mobileWindowWidth) {
      userProps.navbarEl.style.width = userProps.navWidth;
    } else {
      userProps.navbarEl.removeAttribute('style');
    }
  }

  /*-----------------RESIZE EVENTS------------------*/

  //check at end of preparation or resize if navigation should show
  function checkForActivation() {
    var windowWidth = window.outerWidth;
    var activated = hasClass(userProps.navbarEl, 'nav-activated');

    if (windowWidth < userProps.mobileWindowWidth && activated == false) {
      userProps.navbarEl.className += " nav-activated";
    } else if (activated == true && windowWidth > userProps.mobileWindowWidth) {
      userProps.navbarEl.className = userProps.navbarEl.className.replace(new RegExp('(?:^|\\s)'+ 'nav-activated' + '(?:\\s|$)'), ' ');
    }
  }


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
