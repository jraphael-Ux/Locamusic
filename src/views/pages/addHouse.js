import App from '../../App'
import {html, render } from 'lit-html'
import {gotoRoute, anchorRoute} from '../../Router'
import Auth from '../../Auth'
import Utils from '../../Utils'
import BunkyAPI from  './../../BunkyAPI'
import Toast from '../../Toast'

class HouseView {
  init(){
    document.title = 'Add House'    
    this.render()    
    Utils.pageIntroAnim()
  }

async addHouseSubmitHandler(e){
  e.preventDefault()
  const submitBtn = document.querySelector('.submit-btn')
  submitBtn.setAttribute('loading', '')
  const formData = e.detail.formData

  try{
   await BunkyAPI.addHouse(formData)
   Toast.show('House Added!')
   submitBtn.removeAttribute('loading')
   //reset-----
   //text and textarea
   const textInputs = document.querySelectorAll('sl-input, sl-textarea')
   if(textInputs) textInputs.forEach(textInputs => textInputs.value = null)
   //radio button
   const radioInputs = document.querySelectorAll('sl-radio')
   if(radioInputs) radioInputs.forEach(radioInputs => radioInputs.removeAttribute('checked'))
   //image
    const fileInput = document.querySelector('input[type=file]')
    if(fileInput) fileInput.value = null

  }catch(err){
    Toast.show(err, 'error')
    submitBtn.removeAttribute('loading')
  }

}

  render(){
    const template = html`
      <va-app-header title="Add House" user="${JSON.stringify(Auth.currentUser)}"></va-app-header>
      <div class="page-content">  
        <sl-form class="page-form" @sl-submit=${this.addHouseSubmitHandler}>
          <input type="hidden" name="user" value="${Auth.currentUser._id}" />
          <div class="input-group">
            <sl-input name="name" type="text" placeholder="Owner" required></sl-input>
          </div>
          <div class="input-group">
            <sl-input name="lacation" type="text" placeholder="Location" required></sl-input>
          </div>
          <div class="input-group">              
            <sl-input name="price" type="text" placeholder="Price" required>
              <span slot="prefix">Rs</span>
            </sl-input>
          </div>
          <div class="input-group">
            <sl-textarea name="description" rows="3" placeholder="Description"></sl-textarea>
          </div>
          <div class="input-group" style="margin-bottom: 2em;">
            <label>Image</label><br>
            <input type="file" name="image" />              
          </div>
          <div class="input-group" style="margin-bottom: 2em;">
            <label>Period</label><br>
            <sl-radio-group label="Select period" no-fieldset>
              <sl-radio name="period" value="l">Long term</sl-radio>
              <sl-radio name="period" value="s">Short term</sl-radio>
            </sl-radio-group>
          </div>
          <sl-button type="primary" class="submit-btn" submit>Add House</sl-button>
        </sl-form>        

        
      </div>      
    `
    render(template, App.rootEl)
  }
}


export default new HouseView()