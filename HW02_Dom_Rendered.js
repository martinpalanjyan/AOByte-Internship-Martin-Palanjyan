/**
    * The signature function for my El function is el(type: string, attrs: object, children: DomElement | DomElement[]). 
    *  So, in general, it accepts the following:The type of DOM element to be generated ('div','span', etc. ), 
    * an object having tag characteristics (class, id, etc.), and child elements. 
    * This can be a DomElement (SpanElement, for example) or an array of DomElement.
    * In the case of an array, all of its items are siblings under the same parent.
    * The el function returns an instance of DomElement.

    * @param {*} type 
    * @param {*} attrs 
    * @param {*} children 
    * @returns 
    */
function el(type, attrs, children) {
    switch (type) {
      case 'div':
        return new DivElement(attrs, children);
      case 'span':
        return new SpanElement(attrs, children);
      case 'ul':
        return new UlElement(attrs, children);
      case 'li':
        return new LiElement(attrs, children);
     case 'form':
            return new FormElement(attrs, children);
        case 'br':
                return new BrElement(attrs, children);
        case 'input':
            return new inputElement(attrs, children);
        case 'label':
            return new LabelElement(attrs, children);   
    }
  }


  /**
   * DomElement class is a base class for all elements.
   */
  
  class DomElement {
    constructor(type,attrs,children){
      this.type = type;
      this.attrs = attrs;
      this.children = children;
    }
    generalDom(){
      const general = document.createElement(this.type);
      Object.entries(this.attrs).forEach(([k, v]) => {
        general.setAttribute(k, v);
      });
      if (Array.isArray(this.children)) {
        this.children.forEach(c => {
          if (c instanceof DomElement) {
            general.append(c.draw());
          } else if (typeof c === 'string') {
            general.append(document.createTextNode(c));
          }
        });
      }else if (this.children instanceof DomElement) {
        general.append(this.children.draw());
      }else if (typeof this.children === 'string') {
        general.append(document.createTextNode(this.children));
      }
      return general;
    }
    draw() {
      return this.generalDom();
    }
  }



  
  /**
   * Each class extending DomElement implements draw method
   * Each HTML tag has a corresponding class extending DomElement.
   */
  class DivElement extends DomElement {
    constructor(attrs, children) {
      super('div',attrs,children);
    }
  }
  
  class SpanElement extends DomElement {
    constructor(attrs, children) {
      super('span',attrs,children);
    }
  }
  
  class UlElement extends DomElement {
    constructor(attrs, children) {
      super('ul',attrs,children);
    }
 }
  
  
  class LiElement extends DomElement {
    constructor(attrs, children) {
      super('li',attrs,children);
    }
}

class FormElement extends DomElement {
    constructor(attrs, children) {
      super('form',attrs,children);
    }
}

class LabelElement extends DomElement {
    constructor(attrs, children) {
      super('label',attrs,children);
    }
}


class BrElement extends DomElement {
    constructor(attrs, children) {
      super('br',attrs,children);
    }
}


class inputElement extends DomElement {
    constructor(attrs, children) {
      super('input',attrs,children);
    }
}

/**
 * Test Possible Cases
 */


//Number 1 is passed


// const tree = el( 'div',{ id: 'root' },el('div', { class: 'some_classname', id: 'some_id' }, 
// el('span', {}, 'hello')));
//   document.body.appendChild(tree.draw());


//Number 2 is passed
//     const tree =
//   el('div', {id: 'root'},
//     el('ul', {}, [
//       el('li', {}, "Item 1"),
//       el('li', {}, "Item 2"),
//       el('li', {}, "Item 3")
//     ])
//   );
// document.body.appendChild(tree.draw());

//Number 3 is passed


//   const tree =
//     el("form", {action: '/some_action'}, [
//       el("label", {for: 'name'}, "First name:"),
//       el("br", {}, null),
//       el("input", {type: 'text', id: 'name', name: 'name', value: "My name"}, null),
//       el("br", {}, null),
//       el("label", {for: 'last_name'}, "Last name:"),
//       el("br", {}, null),
//       el("input", {type: 'text', id: 'last_name', name: 'last_name', value: "My second name"}, null),
//       el("br", {}, null),
//       el("input", {type: 'submit', value: 'Submit'}, null),
//     ]);
//  document.body.appendChild(tree.draw());

