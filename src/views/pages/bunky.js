import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import BunkyAPI from '../../BunkyAPI'
import Toast from '../../Toast'

class bunkyView {
   async init(){
    document.title = 'House Owner'
    this.Bunky = null     
    this.render()    
    Utils.pageIntroAnim()
    await this.getBunky()
    this.filterbunky('period', 's')
  }
  
  async filterbunky(field, match){
    // validate
    if(!field || !match)return

    // get fresh copy of bunky
    this.Bunky = await BunkyAPI.getBunky()

    let filteredBunkey

    //period
    if(field == 'period'){
      filteredBunkey = this.Bunky.filter(Bunky => this.Bunky.period == match)
    }

    //price
    if(field == 'price'){
      // get priceRangeStart
      const priceRangeStart = match.split('-')[0]
      const priceRangeEnd = match.split('-')[1]
      filteredBunkey = this.Bunky.filter(Bunky => bunkyView.price >= priceRangeStart && this.Bunky.price <= priceRangeEnd)
  }

      //render
      this.Bunky = filteredBunkey
          this.render()
  }

  clearFilterBtns(){
    const filterBtns = document.querySelectorAll('.filter-btn')
filterBtns.forEach(btn => btn.removeAttribute("type") )
  }

handleFilterBtn(e){
  // clear active btn
this.clearFilterBtns()

  // set active
  e.target.setAttribute("type", "primary")

  const field = e.target.getAttribute("data-field")
  const match = e.target.getAttribute("data-match")

  //filter bunky
  this.filterbunky(field, match)
}

clearfilters(){
  this.getBunky()
  this.clearFilterBtns()
}

  async getBunky(){
    try{
      this.Bunky = await BunkyAPI.getBunky()
      console.log(this.Bunky)
      this.render()
    }catch(err){
      Toast.show(err, 'error')
    }
  }

  render(){
    const template = html`
      <va-app-header title="House Owner" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content"> 
      
      <div class="filter-menu">
        <div>
          filter by
        </div>
        <div>
          <strong>Period</strong>
          <sl-button class="filter-btn" size="small" data-field= "period" data-match= "s" @click=${this.handleFilterBtn.bind(this)}>Short</sl-button>
          <sl-button class="filter-btn" size="small" data-field= "period" data-match= "l" @click=${this.handleFilterBtn.bind(this)}>Long</sl-button>
          
        </div>
        <div>
        <strong>Price</strong>
        <sl-button class="filter-btn" size="small" data-field= "price" data-match= "5000-6000" @click=${this.handleFilterBtn.bind(this)}>Rs5000-6000</sl-button>
        <sl-button class="filter-btn" size="small" data-field= "price" data-match= "7000-10000" @click=${this.handleFilterBtn.bind(this)}>Rs7000-10000</sl-button>
        
      </div>
        <div>
          <sl-button size="small" @click=${this.clearfilters.bind(this)}>Clear Filters</sl-button>
        </div>

      </div>
       
        <div class="bunky-grid">
        ${this.Bunky == null ? html `
          <sl-spinner></sl-spinner>
          ` : html`
        ${this.Bunky.map(Bunky => html`
        <va-bunky class="haircut-card"
        name="${Bunky.name}" 
        description="${Bunky.description}"
        price="${Bunky.price}"
        user="${JSON.stringify(Bunky.user)}"
        image="${Bunky.image}"
        location="${Bunky.location}"
        period="${Bunky.period}"
        >
        </va-bunky>
          `)}
        `}
        </div>
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new bunkyView()