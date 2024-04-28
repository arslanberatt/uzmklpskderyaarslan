window.addEventListener('DOMContentLoaded', e=>{
    var navbarMobile = function (){
        const nCollapsible=document.body.querySelector('#mainNavbar');
        const nCollapsible2=document.body.querySelector('#MyDropdown');
        if(!nCollapsible || !nCollapsible2){
            return;
        }
        if(window.scrollY < 485){
            nCollapsible.classList.remove("navbar-mobile");
            nCollapsible2.classList.remove("navbar-mobile");
        }
        else{
            nCollapsible.classList.add("navbar-mobile");
            nCollapsible2.classList.add("navbar-mobile");
        }
    };
    navbarMobile();
    document.addEventListener('scroll',navbarMobile);
    const myNavbar = document.body.querySelector('#mainNavbar');
    const myNavbar2 = document.body.querySelector('#MyDropdown');
    if(myNavbar || myNavbar2){
        new bootstrap.ScrollSpy(document.body,{
            target:'#mainNavbar',
            target:'#MyDropdown',
            offset:74
        });
    }
});












