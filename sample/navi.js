/*!
 * Navi - Navigation Panel
 * 
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
            mobile_window_width: 768,
            nav_width: "50%",
            panel_position: "right",
            panel_ani_open_duration: "400ms",
        },
        hamburger_props: {
            provide_hamburger: true,
            edge_distance_top: "20px",
            edge_distance_left_right: "20px",
            line_height: "2px",
            line_width: "40px",
            line_margin_top: "7px"
        },
        internal_props: {
            navbar_el: null,
            hamburger_el: null,
            hamburger_lines: null,
            line_1: null,
            line_2: null,
            line_3: null,
            raw_width: null,
            nav_width_type: null,
            transform_prefix: null,
            transition_prefix: null,
        }
    }

    /*----------------GENERAL FUNCTIONS----------------*/

    //check for class
    function hasClass(elem, className) {
        return new RegExp(' ' + className + ' ').test(' ' + elem.className + ' ');
    }

    //remove class
    function removeClass(elem, className) {
        var newClass = ' ' + elem.className.replace( /[\t\r\n]/g, ' ') + ' ';
        if (hasClass(elem, className)) {
            while (newClass.indexOf(' ' + className + ' ') >= 0 ) {
                newClass = newClass.replace(' ' + className + ' ', ' ');
            }
            elem.className = newClass.replace(/^\s+|\s+$/g, '');
        }
    }

    function GetVendorPrefix(arrayOfPrefixes) {
        var tmp = document.createElement("div");
        var result = "";

        for (var i = 0; i < arrayOfPrefixes.length; ++i) {
        if (typeof tmp.style[arrayOfPrefixes[i]] != 'undefined') {
            result = arrayOfPrefixes[i];
        } else {
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
            navProps.hamburger_props[x] = props[x];
        }

        //get user's navbar
        navProps.internal_props.navbar_el = document.getElementById("navi");
        //sort out the user's input type for nav width for use and save data
        var navWidthInt = parseInt(navProps.custom_props.nav_width);
        var navWidthType = navProps.custom_props.nav_width.match(/\D/g,'').join("");
        navProps.internal_props.raw_width = navWidthInt;
        navProps.internal_props.nav_width_type = navWidthType;
        debugger
        buildHamburger();

        navProps.internal_props.transform_prefix = GetVendorPrefix(["transform", "msTransform", "MozTransform", "WebkitTransform", "OTransform"]);
        navProps.internal_props.transition_prefix = GetVendorPrefix(["transition", "msTransition", "MozTransition", "WebkitTransition", "OTransition"]);

        buildNavigationBase();
        checkForActivation();
    }
    window.goNavi = goNavi;

    /*-----------------INITIAL BUILDING------------------*/

    //runs once on document creation
    function buildNavigationBase() {
        //create menu title
        var navFirstChild = navProps.internal_props.navbar_el.children[0];
        var menu_title = document.createElement('div');
        menu_title.setAttribute("id", "navi-menu-title");
        menu_title.innerHTML = navProps.custom_props.menu_title;
        navProps.internal_props.navbar_el.prepend(menu_title);

        //set nav position
        if (navProps.custom_props.panel_position == "right") {
            navProps.internal_props.navbar_el.className += " right-panel";
            navProps.internal_props.navbar_el.style.right = navProps.internal_props.raw_width + navProps.internal_props.nav_width_type;
        } else if (navProps.custom_props.panel_position == "left") {
            navProps.internal_props.navbar_el.className += " left-panel";
            navProps.internal_props.navbar_el.style.left = navProps.internal_props.raw_width + navProps.internal_props.nav_width_type;
        }
    }

    function buildHamburger() {
        if (navProps.hamburger_props.provide_hamburger == true) {

            //set up node
            var burgerArr = [];

            var burgerParent = document.createElement('div');
            burgerParent.setAttribute("id", "navi-event-init");
            burgerParent.className = "navi-burger-container nav-closed";

            //style parent
            burgerParent.style[navProps.custom_props.panel_position] = navProps.hamburger_props.edge_distance_left_right;
            burgerParent.style.top = navProps.hamburger_props.edge_distance_top;

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
            navProps.internal_props.navbar_el.parentNode.insertBefore(burgerParent, navProps.internal_props.navbar_el.nextSibling);
            debugger
            //save the newly created hamburger
            navProps.internal_props.hamburger_el = burgerParent
            navProps.internal_props.hamburger_lines = navProps.internal_props.hamburger_el.childNodes
            navProps.internal_props.line_1 = burgerChild1
            navProps.internal_props.line_2 = burgerChild2
            navProps.internal_props.line_3 = burgerChild3

            //style children lines
            for (i = 0; i < navProps.internal_props.hamburger_lines.length; i++) { 
                navProps.internal_props.hamburger_lines[i].style.height = navProps.hamburger_props.line_height;
                navProps.internal_props.hamburger_lines[i].style.width = navProps.hamburger_props.line_width;
                if (i != 0) {
                    navProps.internal_props.hamburger_lines[i].style.marginTop = navProps.hamburger_props.line_margin_top;  
                }
            }
        } else {
            navProps.internal_props.hamburger_el = document.getElementById("custom-nav-init")
        }
    }

    //runs on resize
    //set styles when panel is activated
    function setPanelOnlyAttributes() {
        if (window.outerWidth < navProps.custom_props.mobile_window_width) {
            navProps.internal_props.navbar_el.style.width = navProps.custom_props.nav_width;
            //set nav position left/right
            if (navProps.custom_props.panel_position == "right") {
                navProps.internal_props.navbar_el.style.right = (navProps.internal_props.raw_width * -1) + navProps.internal_props.nav_width_type;
                navProps.internal_props.navbar_el.style.textAlign = "left";
            } else if (navProps.custom_props.panel_position == "left") {
                navProps.internal_props.navbar_el.style.left = (navProps.internal_props.raw_width * -1) + navProps.internal_props.nav_width_type;
                navProps.internal_props.navbar_el.style.textAlign = "right";
            }
        } 
    }

    /*--------------------EVENTS----------------------*/

    function aniOpen(transformPrefix, transitionPrefix) {
        //line 1
        var transitionProp1 = "transform " + "400ms" + " ease";

        var transformProp1Move = "translateY(" + "10px" + ")";
        var transformProp1Rotate = "rotate(45deg)";

        //line 3
        var transitionProp3 = "transform " + "400ms" + " ease";

        var transformProp3Move = "translateY(" + "-10px" + ")";
        var transformProp3Rotate = "rotate(-45deg)";

        navProps.internal_props.line_1.style[transitionPrefix] = transitionProp1;
        navProps.internal_props.line_1.style[transformPrefix] = transformProp1Move;

        navProps.internal_props.line_2.style.opacity = "0";

        navProps.internal_props.line_3.style[transitionPrefix] = transitionProp3;
        navProps.internal_props.line_3.style[transformPrefix] = transformProp3Move;
    }

    function aniClose(transformPrefix, transitionPrefix) {
        
    }

    function openNav() {
        navProps.internal_props.navbar_el.className += " open-nav";
        if (navProps.internal_props.transform_prefix != null) {

            var transformPrefix = navProps.internal_props.transform_prefix;
            var transitionPrefix = navProps.internal_props.transition_prefix;

            var transitionProp = "transform " + navProps.custom_props.panel_ani_open_duration + " ease";
            var transformProp = "translateX(" + (navProps.internal_props.raw_width * -1) + navProps.internal_props.nav_width_type + ")";
            
            navProps.internal_props.navbar_el.style[transitionPrefix] = transitionProp;
            navProps.internal_props.navbar_el.style[transformPrefix] = transformProp;
            
            aniOpen(transformPrefix, transitionPrefix);
        }
    }

    function closeNav() {
        removeClass(navProps.internal_props.navbar_el, 'open-nav');
        if (navProps.internal_props.transform_prefix != null) {

            var transformPrefix = navProps.internal_props.transform_prefix;
            var transitionPrefix = navProps.internal_props.transition_prefix;

            var transitionProp = "transform " + navProps.custom_props.panel_ani_open_duration + " ease";
            var transformProp = "translateX(" + navProps.internal_props.raw_width + navProps.internal_props.nav_width_type + ")";
            
            navProps.internal_props.navbar_el.style[transitionPrefix] = transitionProp;
            navProps.internal_props.navbar_el.style[transformPrefix] = transformProp;
            
            aniClose(transformPrefix, transitionPrefix);
        }
    }

    /*-----------------RESIZE EVENTS------------------*/

    //check at end of preparation or resize if navigation should show
    function checkForActivation() {
        var windowWidth = window.outerWidth;
        var activated = hasClass(navProps.internal_props.navbar_el, 'nav-activated');
        if (windowWidth < navProps.custom_props.mobile_window_width && activated == false) {
            navProps.internal_props.navbar_el.className += " nav-activated";
            debugger
            navProps.internal_props.hamburger_el.style.display = "block";
            setPanelOnlyAttributes();
        } else if (activated == true && windowWidth > navProps.custom_props.mobile_window_width) {
            removeClass(navProps.internal_props.navbar_el, "nav-activated");
            navProps.internal_props.navbar_el.removeAttribute('style');
            navProps.internal_props.hamburger_el.removeAttribute('style');
        }
    }

    /*-----------------EVENT LISTENERS------------------*/

    document.querySelector('body').addEventListener("click", function(event){
        event.preventDefault();
        var elem = event.target;    
        while (elem != document) {
            if (elem.id.toLowerCase() === navProps.internal_props.hamburger_el.id) {
                var isOpen = hasClass(navProps.internal_props.navbar_el, 'open-nav');
                if (isOpen == false) {
                    openNav();
                } else if (isOpen == true) {
                    closeNav();
                }

            }
            elem = elem.parentNode;
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
