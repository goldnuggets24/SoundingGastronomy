$( document ).ready(function() {
  mdc.autoInit();
  $('.main-carousel').flickity({
    cellAlign: 'left',
    contain: true,
    wrapAround: true
  }); 
  // tap to content on event popup
  $('.tap-target').tapTarget('open');
  $('.tap-target').tapTarget('close');
    // navigation drawer
  var drawerEl = document.querySelector('.mdc-persistent-drawer');
      var MDCPersistentDrawer = mdc.drawer.MDCPersistentDrawer;
      var drawer = new MDCPersistentDrawer(drawerEl);
      document.querySelector('.demo-menu').addEventListener('click', function() {
        drawer.open = !drawer.open;
      });
      drawerEl.addEventListener('MDCPersistentDrawer:open', function() {
        console.log('Received MDCPersistentDrawer:open');
      });
      drawerEl.addEventListener('MDCPersistentDrawer:close', function() {
        console.log('Received MDCPersistentDrawer:close');
      });
  });