/*-----------------GLOBALS-----------------*/
var userProps;


/*----------------GENERAL FUNCTIONS----------------*/

//check for class
function hasClass(element, cls) {
    return (' ' + element.className + ' ').indexOf(' ' + cls + ' ') > -1;
}

/*-----------------NAVI FUNCTIONS------------------*/

function goNavi(props) {
  //set prop global variable
  userProps = props;

  //set up starting variables
  var navigation = document.getElementById("navi");

  buildNavigationBasis(navigation);


  checkForActivation();
}

function buildNavigationBasis(navigation) {

  //create menu title
  var navFirstChild = navigation.children[0];
  var menuTitle = document.createElement('div');
  menuTitle.setAttribute("id", "navi-menu-title");
  menuTitle.innerHTML = userProps.menuTitle;
  navigation.prepend(menuTitle);

  //set nav position
  if (userProps.panelPosition == "right") {
    navigation.className += " right-panel";
  } else if (userProps.panelPosition == "left") {
    navigation.className += " left-panel";
  }

  setMobileAttributes(navigation);

}
//set styles on mobile
function setMobileAttributes(navigation) {
  if (window.outerWidth < userProps.mobileWindowWidth) {
    navigation.style.width = userProps.navWidth;
  } else {
    navigation.removeAttribute('style');
  }
}
//check at end of preparation or resize if navigation should show
function checkForActivation() {
  var windowWidth = window.outerWidth;
  var navigation = document.getElementById("navi");
  var activated = hasClass(navigation, 'nav-activated');

  if (windowWidth < userProps.mobileWindowWidth && activated == false) {
    navigation.className += " nav-activated";
  } else if (activated == true && windowWidth > userProps.mobileWindowWidth) {
    navigation.className = navigation.className.replace(new RegExp('(?:^|\\s)'+ 'nav-activated' + '(?:\\s|$)'), ' ');
  }
}

document.addEventListener("DOMContentLoaded", function(){

});

window.onresize = function(event) {
    checkForActivation();
};