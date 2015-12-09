#jquery.context-menu.js
Treat an HTML element as a context menu

## Usage

```html
<div id="menu-container" class="container">
  <div id="context-menu" class="context-menu">
    <div class="heading">
      <h4>
        <span class="title">Context Menu Heading</span>
        <span class="menu-close">&times;</span>
      </h4>
    </div>
    <div class="body">
      Context Menu Body
    </div>
  </div>
  <div id="content">
    ...
  </div>
</div>
```

```js
var cm = $('#context-menu').contextMenu({
  container: $('#menu-container')
});

/* Optional show/hide on demand */

cm.show({ // manually give display coords
  x: 0,
  y: 0
});

$('#menu-container').on('click', function(e) { // use an event to get coords for display
  cm.show(e);
});
```

## Options
  * **container** [default: *undefined*]: An element which, when clicked on, automatically shows the context menu at the location where it was clicked
  * **closeClass** [default: *menu-close*]: The class for an element which, when clicked on, will hide the context  menu
