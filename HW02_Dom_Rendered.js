
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
    draw() {}
  }
  
  /**
   * Each class extending DomElement implements draw method
   * Each HTML tag has a corresponding class extending DomElement.
   */
  class DivElement extends DomElement {
    constructor(attrs, children) {
      super();
      this.attrs = attrs;
      this.children = children;
    }
  
    draw() {
      const div = document.createElement('div');
      Object.entries(this.attrs).forEach(([k, v]) => {
        div.setAttribute(k, v);
      });
       if (Array.isArray(this.children)) {
        this.children.forEach(c => {
          if (c instanceof DomElement) {
            div.append(c.draw());
          } else if (typeof c === 'string') {
            div.append(document.createTextNode(c));
          }
        });
      }else if (this.children instanceof DomElement) {
        div.append(this.children.draw());
      }else if (typeof this.children === 'string') {
        div.append(document.createTextNode(this.children));
      }
      return div;
    }
  }
  
  class SpanElement extends DomElement {
    constructor(attrs, children) {
      super();
      this.attrs = attrs;
      this.children = children;
    }
  
    draw() {
      const span = document.createElement('span');
      Object.entries(this.attrs).forEach(([k, v]) => {
        span.setAttribute(k, v);
      });

     if (Array.isArray(this.children)) {
        this.children.forEach(c => {
          if (c instanceof DomElement) {
            span.append(c.draw());
          } else if (typeof c === 'string') {
            span.append(document.createTextNode(c));
          }
        });
      }  else if (this.children instanceof DomElement) {
        span.append(this.children.draw());
      } else if (typeof this.children === 'string') {
        span.append(document.createTextNode(this.children));
      }
  
      return span;
    }
  }
  
  class UlElement extends DomElement {
    constructor(attrs, children) {
      super();
      this.attrs = attrs;
      this.children = children;
    }
  
    draw() {
    
      const ul = document.createElement('ul');
      Object.entries(this.attrs).forEach(([k, v]) => {
        ul.setAttribute(k, v);
      });
        if(Array.isArray(this.children)){
        this.children.forEach(c => {
          if (c instanceof DomElement) {
            ul.append(c.draw());
          } else if (typeof c === 'string') {
            ul.append(document.createTextNode(c));
          }
        });
      }else if (this.children instanceof DomElement) {
        ul.append(this.children.draw());
      }else if (typeof this.children === 'string') {
        ul.append(document.createTextNode(this.children));
      }
      return ul;
    }
 }
  
  
  class LiElement extends DomElement {
    constructor(attrs, children) {
      super();
      this.attrs = attrs;
      this.children = children;
    }
    draw() {
        const li = document.createElement('li');
        Object.entries(this.attrs).forEach(([k, v]) => {
            li.setAttribute(k, v);
        });
        if (Array.isArray(this.children)) {
            this.children.forEach(c => {
                if (c instanceof LiElement) {
                    li.append(c.draw());
                } else if (typeof c === 'string') {
                    li.append(document.createTextNode(c));
                }
            });
        } else if (this.children instanceof DomElement) {
            li.append(this.children.draw());
          }else if (typeof this.children === 'string') {
            li.append(document.createTextNode(this.children));
        }
    
        return li;
    }
}

class FormElement extends DomElement {
    constructor(attrs, children) {
      super();
      this.attrs = attrs;
      this.children = children;

    }
    draw() {
        const form = document.createElement('form');
        Object.entries(this.attrs).forEach(([k, v]) => {
            form.setAttribute(k, v);
        });
        if (Array.isArray(this.children)) {
            this.children.forEach(c => {
                if (c instanceof DomElement) {
                    form.append(c.draw());
                } else if (typeof c === 'string') {
                    form.append(document.createTextNode(c));
                }
            });
        } else if (this.children instanceof DomElement) {
            form.append(this.children.draw());
          }else if (typeof this.children === 'string') {
            form.append(document.createTextNode(this.children));
        }
    
        return form;
    }
}

class LabelElement extends DomElement {
    constructor(attrs, children) {
      super();
      this.attrs = attrs;
      this.children = children;

    }
    draw() {
        const label = document.createElement('label');
        Object.entries(this.attrs).forEach(([k, v]) => {
            label.setAttribute(k, v);
        });
        if (Array.isArray(this.children)) {
            this.children.forEach(c => {
                if (c instanceof DomElement) {
                    label.append(c.draw());
                } else if (typeof c === 'string') {
                    label.append(document.createTextNode(c));
                }
            });
        }else if (this.children instanceof DomElement) {
            label.append(this.children.draw());
          }else if (typeof this.children === 'string') {
            label.append(document.createTextNode(this.children));
        }
    
        return label;
    }
}


class BrElement extends DomElement {
    constructor(attrs, children) {
      super();
      this.attrs = attrs;
      this.children = children;

    }
    draw() {
        const br = document.createElement('br');
        Object.entries(this.attrs).forEach(([k, v]) => {
            br.setAttribute(k, v);
        });
        if (Array.isArray(this.children)) {
            this.children.forEach(c => {
                if (c instanceof DomElement) {
                    br.append(c.draw());
                } else if (typeof c === 'string') {
                    br.append(document.createTextNode(c));
                }
            });
        } else if (this.children instanceof DomElement) {
            br.append(this.children.draw());
          }else if (typeof this.children === 'string') {
            br.append(document.createTextNode(this.children));
        }
    
        return br;
    }
}


class inputElement extends DomElement {
    constructor(attrs, children) {
      super();
      this.attrs = attrs;
      this.children = children;

    }
    draw() {
        const input = document.createElement('input');
        Object.entries(this.attrs).forEach(([k, v]) => {
            input.setAttribute(k, v);
        });
        if (Array.isArray(this.children)) {
            this.children.forEach(c => {
                if (c instanceof DomElement) {
                    input.append(c.draw());
                } else if (typeof c === 'string') {
                    input.append(document.createTextNode(c));
                }
            });
        }else  if (this.children instanceof DomElement) {
            input.append(this.children.draw());
          }else if (typeof this.children === 'string') {
            input.append(document.createTextNode(this.children));
        }
        return input;
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


//     const tree =
//       el("form", {action: '/some_action'}, [
//         el("label", {for: 'name'}, "First name:"),
//         el("br", {}, null),
//         el("input", {type: 'text', id: 'name', name: 'name', value: "My name"}, null),
//         el("br", {}, null),
//         el("label", {for: 'last_name'}, "Last name:"),
//         el("br", {}, null),
//         el("input", {type: 'text', id: 'last_name', name: 'last_name', value: "My second name"}, null),
//         el("br", {}, null),
//         el("input", {type: 'submit', value: 'Submit'}, null),
//       ]);
//    document.body.appendChild(tree.draw());



