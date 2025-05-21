
/*
Code for Import https://scriptui.joonas.me — (Triple click to select): 
{"items":{"item-0":{"id":0,"type":"Dialog","parentId":false,"style":{"enabled":true,"varName":null,"windowType":"Dialog","creationProps":{"su1PanelCoordinates":false,"maximizeButton":true,"minimizeButton":true,"independent":false,"closeButton":true,"borderless":true,"resizeable":false},"text":"Dialog","preferredSize":[0,0],"margins":16,"orientation":"column","spacing":10,"alignChildren":["center","top"]}},"item-1":{"id":1,"type":"VerticalTabbedPanel","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[300,0],"tabNavWidth":0,"margins":0,"alignment":null,"selection":2}},"item-2":{"id":2,"type":"Tab","parentId":1,"style":{"enabled":true,"varName":null,"text":"Tab","orientation":"column","spacing":10,"alignChildren":["fill","top"]}},"item-4":{"id":4,"type":"Tab","parentId":1,"style":{"enabled":true,"varName":null,"text":"Tab","orientation":"column","spacing":10,"alignChildren":["fill","top"]}},"item-7":{"id":7,"type":"Checkbox","parentId":15,"style":{"enabled":true,"varName":null,"text":"Checkbox","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-8":{"id":8,"type":"Checkbox","parentId":15,"style":{"enabled":true,"varName":null,"text":"Checkbox","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-9":{"id":9,"type":"RadioButton","parentId":15,"style":{"enabled":true,"varName":null,"text":"RadioButton","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":true}},"item-10":{"id":10,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":0,"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-11":{"id":11,"type":"Button","parentId":10,"style":{"enabled":true,"varName":null,"text":"Accept","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-12":{"id":12,"type":"Button","parentId":10,"style":{"enabled":true,"varName":null,"text":"Cancel","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-13":{"id":13,"type":"Button","parentId":20,"style":{"enabled":true,"varName":null,"text":"?","justify":"right","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-15":{"id":15,"type":"Panel","parentId":2,"style":{"enabled":true,"varName":null,"creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Panel","preferredSize":[0,0],"margins":[16,8,8,8],"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-16":{"id":16,"type":"StaticText","parentId":19,"style":{"enabled":true,"varName":null,"creationProps":{"truncate":"none","multiline":false,"scrolling":false},"softWrap":false,"text":".:RZK EXPORTADOR:.","justify":"center","preferredSize":[0,0],"alignment":null,"helpTip":null}},"item-17":{"id":17,"type":"DropDownList","parentId":18,"style":{"enabled":true,"varName":null,"text":"DropDownList","listItems":"Item 1, Item 2, Item 3, Item 4","preferredSize":[0,0],"alignment":null,"selection":0,"helpTip":null}},"item-18":{"id":18,"type":"Panel","parentId":4,"style":{"enabled":true,"varName":null,"creationProps":{"borderStyle":"etched","su1PanelCoordinates":false},"text":"Panel","preferredSize":[0,0],"margins":10,"orientation":"column","spacing":10,"alignChildren":["left","top"],"alignment":null}},"item-19":{"id":19,"type":"Group","parentId":20,"style":{"enabled":true,"varName":null,"preferredSize":[219,0],"margins":[0,0,0,0],"orientation":"row","spacing":10,"alignChildren":["center","center"],"alignment":null}},"item-20":{"id":20,"type":"Group","parentId":0,"style":{"enabled":true,"varName":null,"preferredSize":[0,0],"margins":[0,0,0,58],"orientation":"row","spacing":10,"alignChildren":["left","center"],"alignment":null}},"item-21":{"id":21,"type":"RadioButton","parentId":15,"style":{"enabled":true,"varName":null,"text":"RadioButton","preferredSize":[0,0],"alignment":null,"helpTip":null,"checked":false}}},"order":[0,20,19,16,13,1,2,15,7,8,9,21,4,18,17,10,11,12],"settings":{"importJSON":true,"indentSize":false,"cepExport":false,"includeCSSJS":true,"showDialog":true,"functionWrapper":false,"afterEffectsDockable":false,"itemReferenceList":"None"},"activeId":9}
*/ 

// DIALOG
// ======
var dialog = new Window("dialog", undefined, undefined, {maximizeButton: true, minimizeButton: true, borderless: true}); 
    dialog.text = "Dialog"; 
    dialog.orientation = "column"; 
    dialog.alignChildren = ["center","top"]; 
    dialog.spacing = 10; 
    dialog.margins = 16; 

// GROUP1
// ======
var group1 = dialog.add("group", undefined, {name: "group1"}); 
    group1.orientation = "row"; 
    group1.alignChildren = ["left","center"]; 
    group1.spacing = 10; 
    group1.margins = [58,0,0,0]; 

// GROUP2
// ======
var group2 = group1.add("group", undefined, {name: "group2"}); 
    group2.preferredSize.width = 219; 
    group2.orientation = "row"; 
    group2.alignChildren = ["center","center"]; 
    group2.spacing = 10; 
    group2.margins = [0,0,0,0]; 

var statictext1 = group2.add("statictext", undefined, undefined, {name: "statictext1"}); 
    statictext1.text = ".:RZK EXPORTADOR:."; 
    statictext1.justify = "center"; 

// GROUP1
// ======
var button1 = group1.add("button", undefined, undefined, {name: "button1"}); 
    button1.text = "?"; 
    button1.justify = "right"; 

// VERTICALTABBEDPANEL1
// ====================
var verticaltabbedpanel1 = dialog.add("group", undefined, undefined, {name: "verticaltabbedpanel1"}); 
    verticaltabbedpanel1.alignChildren = ["left","fill"]; 
var verticaltabbedpanel1_nav = verticaltabbedpanel1.add ("listbox", undefined, ['Tab','Tab']); 
var verticaltabbedpanel1_innerwrap = verticaltabbedpanel1.add("group") 
    verticaltabbedpanel1_innerwrap.alignment = ["fill","fill"]; 
    verticaltabbedpanel1_innerwrap.orientation = ["stack"]; 
    verticaltabbedpanel1.preferredSize.width = 300; 

// TAB1
// ====
var tab1 = verticaltabbedpanel1_innerwrap.add("group", undefined, {name: "tab1"}); 
    tab1.text = "Tab"; 
    tab1.orientation = "column"; 
    tab1.alignChildren = ["fill","top"]; 
    tab1.spacing = 10; 
    tab1.margins = 0; 

// PANEL1
// ======
var panel1 = tab1.add("panel", undefined, undefined, {name: "panel1"}); 
    panel1.text = "Panel"; 
    panel1.orientation = "column"; 
    panel1.alignChildren = ["left","top"]; 
    panel1.spacing = 10; 
    panel1.margins = [8,16,8,8]; 

var checkbox1 = panel1.add("checkbox", undefined, undefined, {name: "checkbox1"}); 
    checkbox1.text = "Checkbox"; 

var checkbox2 = panel1.add("checkbox", undefined, undefined, {name: "checkbox2"}); 
    checkbox2.text = "Checkbox"; 

var radiobutton1 = panel1.add("radiobutton", undefined, undefined, {name: "radiobutton1"}); 
    radiobutton1.text = "RadioButton"; 
    radiobutton1.value = true; 

var radiobutton2 = panel1.add("radiobutton", undefined, undefined, {name: "radiobutton2"}); 
    radiobutton2.text = "RadioButton"; 

// TAB2
// ====
var tab2 = verticaltabbedpanel1_innerwrap.add("group", undefined, {name: "tab2"}); 
    tab2.text = "Tab"; 
    tab2.orientation = "column"; 
    tab2.alignChildren = ["fill","top"]; 
    tab2.spacing = 10; 
    tab2.margins = 0; 

// VERTICALTABBEDPANEL1
// ====================
verticaltabbedpanel1_tabs = [tab1,tab2]; 

for (var i = 0; i < verticaltabbedpanel1_tabs.length; i++) { 
  verticaltabbedpanel1_tabs[i].alignment = ["fill","fill"]; 
  verticaltabbedpanel1_tabs[i].visible = false; 
} 

verticaltabbedpanel1_nav.onChange = showTab_verticaltabbedpanel1; 

function showTab_verticaltabbedpanel1() { 
  if ( verticaltabbedpanel1_nav.selection !== null ) { 
    for (var i = verticaltabbedpanel1_tabs.length-1; i >= 0; i--) { 
      verticaltabbedpanel1_tabs[i].visible = false; 
    } 
    verticaltabbedpanel1_tabs[verticaltabbedpanel1_nav.selection.index].visible = true; 
  } 
} 

verticaltabbedpanel1_nav.selection = 0; 
showTab_verticaltabbedpanel1() 

// PANEL2
// ======
var panel2 = tab2.add("panel", undefined, undefined, {name: "panel2"}); 
    panel2.text = "Panel"; 
    panel2.orientation = "column"; 
    panel2.alignChildren = ["left","top"]; 
    panel2.spacing = 10; 
    panel2.margins = 10; 

var dropdown1_array = ["Item 1","Item 2","Item 3","Item 4"]; 
var dropdown1 = panel2.add("dropdownlist", undefined, undefined, {name: "dropdown1", items: dropdown1_array}); 
    dropdown1.selection = 0; 

// GROUP3
// ======
var group3 = dialog.add("group", undefined, {name: "group3"}); 
    group3.orientation = "row"; 
    group3.alignChildren = ["left","center"]; 
    group3.spacing = 10; 
    group3.margins = 0; 

var button2 = group3.add("button", undefined, undefined, {name: "button2"}); 
    button2.text = "Accept"; 

var button3 = group3.add("button", undefined, undefined, {name: "button3"}); 
    button3.text = "Cancel"; 

dialog.show();

