import { LitElement, html, css } from '@polymer/lit-element'
import {anchorRoute, gotoRoute} from './../Router'
import Auth from './../Auth'
import App from './../App'

customElements.define('va-bunky', class Bunky extends LitElement {
  constructor(){
    super()    
  }

  static get properties(){
    return {
        name: {
            type: String
          },
          description: {
            type: String
          },
          price: {
            type: String
          },
          location: {
            type: String
          },
          user: {
            type: Object
          },
          image: {
            type: String
          },
          period: {
            type: String
          }   
    }
  }

  firstUpdated(){
    super.firstUpdated()
  }

  moreInfoHandler(){
    // create sl-dialog
    const dialogEl = document.createElement('sl-dialog')
    // add classname
    dialogEl.className = 'bunky-dialog'
    // sl-dialog content
    const dialogContent = html`
    <style>
        .wrap {
            display: flex;
        }
        .image {
            width: 50%;
        }
        .image img {
            width: 100%;
        }
        .content {
            padding-left: 1em;
        }
        .gender span,
        .length span {
            text-transform: uppercase;
            font-weight: bold;
        }
        .price {
            font-size: 1.5em;
            colour: var(--brand-color)
        }
        </style>
            <div class="wrap">
            <div class="image">
                <img src="${App.apiBase}/images/${this.image}" alt="${this.name}" />
            </div>
            <div class="content">
                <h1>${this.name}</h1>
                <p>${this.description}</p>
                <p class="price">Rs${this.price}/month</p>
                <p class="location">Location: <span>${this.location}</span></p>
                <p class="perion">Period: <span>${this.period}</span></p>
            </div>
        </div>
    `
    render(dialogContent, dialogEl)
    // append to document.body
    document.body.append(dialogEl)
    //show sl-dialog
    dialogEl.show()
    // delete dialog
    dialogEl.addEventListener('sl-after-hide', () => {
        dialogEl.remove()
    })
  }

  
  render(){    
    return html`
    <style>
      .author{
          font-size: 1em;
          opacity: 0.8;
      }
    </style>
    <sl-card>
    <img slot="image" src="${App.apiBase}/images/${this.image}" />
    <h2>${this.name}</h2>
    <h3>${this.description}</h3>
    <h3>Rs${this.price}/month</h3>
    <p class="author">By ${this.user.firstName} ${this.user.lastName}</p>
    <sl-button @click=${this.moreInfoHandler}>More Info</sl-button>
    </sl-card>
    `
  }
  
})