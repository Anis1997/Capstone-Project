<template>
<section class="page-section" id="cart">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <h2 class="section-heading text-uppercase">Your Cart</h2>
          <h3 class="section-subheading text-muted">Please do Come Again</h3>
        </div>
      </div>
<reactive-base app="bakery_product" credentials="A7GxeBXyq:dd0291f1-f611-4dac-843d-3f2cc78cec82">

  <nav>
    <div class="container">

      <ul class="navbar-right">
        <li>
          <a href="/cart" class="my-cart-icon">
            <i class="fa fa-shopping-cart"></i>
            Cart 
            <span class="badge my-cart-counter">0</span>
          </a>
        </li>
      </ul> <!--end navbar-right -->
    </div> <!--end container -->
  </nav>

  <div class="container my-cart-popup">
   <div class="shopping-cart">
      <div class="shopping-cart-header">
        <div class="shopping-cart-total">
          <span class="lighter-text">Total:</span>
          <span class="main-color-text my-cart-total"></span>
        </div>
      </div> <!--end shopping-cart-header -->

      <ul class="shopping-cart-items">
          No Items yet
      </ul>

      <a href="#" class="button my-cart-checkout">Checkout</a>
    </div> <!--end shopping-cart -->
  </div> <!--end container -->
   
<h1>Bakery Web</h1>


<DataSearch
    componentId="repo"
    filterLabel="Search"
    :dataField="[
      'pCategory',
      'pDescription',
      'pName'

    ]"
    placeholder="Search Items"
    iconPosition="left"
    :autosuggest="true"
    URLParams
    class="data-search-container results-container"
    :innerClass="{
      input: 'search-input'
    }"
/>

<div class="btn toggle-btn">Toggle Filters</div>

<MultiDropdownList
  componentId="category"
  dataField="pCategory.keyword"
  placeholder="Select Category"
  title="Category"
  filterLabel="Category"
  :innerClass="{
    select: 'dropdown-select',
    title: 'inner-title',
    list: 'dropdown-list'
  }"
/>

      <reactive-list
        componentId="SearchResult"
        dataField="pName.keyword"
        className="result-list-container"
        :pagination="true"
        :from="0"
        :size="5"
        :react="{and: ['category']}"
      >

      
<!--div id="app" class="container"-->
   <!--div class="text-right">
     <button class="btn btn-primary" data-toggle="modal" data-target="#cartModal">Cart ({{cartItems.length}})</button>
     </div-->      


    


   
        <div slot="renderData" slot-scope="{ item }">
          <div class="flex item-content" key="item._id">
            <img :url="item.pImage" alt="Item name"/>
            <div class="flex column justify-center ml20">
              <div class="my-cart-name product my-cart-id">{{ item.pName }}</div>
                <div class="flex column justify-space-between">
                    <div>
                      <div>
                        = <span class="price my-cart-price">{{ item.pPrice  }} won</span>
                        
                      </div>

                      <button class="my-cart-add" v-on:click="add_cart()" >ADD TO CART</button>

                     
                      
                      <!--div class="ratings-list flex align-center">
                        <span class="stars">
                      <i v-for="(item, index) in Array(item.average_rating_rounded).fill('x')" class="fas fa-star" :key="index" />
                    </span>
                    <span class="avg-rating">({{item.average_rating}} avg)</span>
                  </div-->
                </div>
                <span class="pub-year">{{item.pStock}}</span>     
              </div>
            </div>
          </div>           
          <!--div class="controls">
      <button class="add-btn" @click="addToCart" v-if="qtyInCart == 0">ADD TO CART</button>
      <div class="clearfix" v-else>
        <button class="inc" @click="inc">+</button>
        <button class="dec" @click="dec">-</button>
      </di>
    </div-->
        </div>
 
      </reactive-list>



</reactive-base>

    </div>
    
  </section>
  </template>

<script>
  export default {
    name: "cart", 
      data: function() {

     
     return {
       showItems: window.innerWidth <= 768 ? true : false,
     }

  },

   addCart(){

   },

  

  methods: {
    switchContainer: function() {
      return (this.showItems = !this.showItems);
    },

    


    
  },

  
  };
 
</script>

<style lang="css">
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

.glyphicon { margin-right:5px; }
.thumbnail
{
  margin-bottom: 20px;
  padding: 0px;
  -webkit-border-radius: 0px;
  -moz-border-radius: 0px;
  border-radius: 0px;
}

.item.list-group-item
{
  float: none;
  width: 100%;
  background-color: #fff;
  margin-bottom: 10px;
}
.item.list-group-item:nth-of-type(odd):hover,.item.list-group-item:hover
{
  background: #428bca;
}

.item.list-group-item .list-group-image
{
  margin-right: 10px;
}
.item.list-group-item .thumbnail
{
  margin-bottom: 0px;
}
.item.list-group-item .caption
{
  padding: 9px 9px 0px 9px;
}
.item.list-group-item:nth-of-type(odd)
{
  background: #eeeeee;
}

.item.list-group-item:before, .item.list-group-item:after
{
  display: table;
  content: " ";
}

.item.list-group-item img
{
  float: left;
}
.item.list-group-item:after
{
  clear: both;
}
.list-group-item-text
{
  margin: 0 0 11px;
}

@import url(https://fonts.googleapis.com/css?family=Lato:300,400,700);
@import url(https://maxcdn.bootstrapcdn.com/font-awesome/4.4.0/css/font-awesome.min.css);
*, *:before, *:after {
  box-sizing: border-box;
}

body {
  font: 14px/22px "Lato", Arial, sans-serif;
  background: #e3e3e3;
}

.lighter-text {
  color: #ABB0BE;
}

.main-color-text {
  color: #6394F8;
}

nav {
  padding: 20px 0 40px 0;
  background: #F8F8F8;
  font-size: 16px;
}
nav .navbar-left {
  float: left;
}
nav .navbar-right {
  float: right;
}
nav ul li {
  display: inline;
  padding-left: 20px;
}
nav ul li a {
  color: #777777;
  text-decoration: none;
}
nav ul li a:hover {
  color: black;
}

.container {
  margin: auto;
  width: 80%;
}

.badge {
  background-color: #6394F8;
  border-radius: 10px;
  color: white;
  display: inline-block;
  font-size: 12px;
  line-height: 1;
  padding: 3px 7px;
  text-align: center;
  vertical-align: middle;
  white-space: nowrap;
}

.shopping-cart {
  margin: 20px 0;
  float: right;
  background: #e8e8e8;
  width: 320px;
  position: absolute;
  border-radius: 3px;
  padding: 20px;
  right: 7.5%;
  display: none;
  box-shadow: 2px 1px 1px 1px #aaa;
}
.shopping-cart .shopping-cart-header {
  border-bottom: 1px solid #E8E8E8;
  padding-bottom: 15px;
}
.shopping-cart .shopping-cart-header .shopping-cart-total {
  float: right;
}
.shopping-cart .shopping-cart-items {
  padding-top: 20px;
}
.shopping-cart .shopping-cart-items li {
  margin-bottom: 18px;
}
.shopping-cart .shopping-cart-items img {
  float: left;
  margin-right: 12px;
}
.shopping-cart .shopping-cart-items .item-name {
  display: block;
  padding-top: 10px;
  font-size: 16px;
}
.shopping-cart .shopping-cart-items .item-price {
  color: #6394F8;
  margin-right: 8px;
}
.shopping-cart .shopping-cart-items .item-quantity {
  color: #ABB0BE;
}

.shopping-cart:after {
  bottom: 100%;
  left: 89%;
  border: solid transparent;
  content: " ";
  height: 0;
  width: 0;
  position: absolute;
  pointer-events: none;
  border-bottom-color: #e8e8e8;
  border-width: 8px;
  margin-left: -8px;
}

.cart-icon {
  color: #515783;
  font-size: 24px;
  margin-right: 7px;
  float: left;
}
.shopping-cart-items li{
  list-style: none;
}
.update-qty {
    color: rgb(109, 109, 109);
    cursor: pointer;
    margin: 0 5px 0 5px;
}
.update-qty:hover{
  color: #464646;
}
.my-cart-remove-container{
     margin-right: 50px;
     align-self: center;
}
.my-cart-remove{
    font-size: 20px;
    cursor: pointer;
    color: rgb(109, 109, 109);
}
.my-cart-remove:hover{
  color: #464646;
}
.button {
  background: #6394F8;
  color: white;
  text-align: center;
  padding: 12px;
  text-decoration: none;
  display: block;
  border-radius: 3px;
  font-size: 16px;
  margin: 25px 0 15px 0;
}
.button:hover {
  background: #729ef9;
}
.clearfix{
 display: flex;
  justify-content: space-between;
}
.nav{
  text-align: right;
}
.cart-icon{
  margin: 50px;
}
.products{
  width: 80%;
  height: 600px;
  margin: 0 auto;
  padding: 50px;
  display: flex;
  flex-wrap: wrap;
  background-color: #fff;
  justify-content: space-around;
  box-shadow: 2px 2px 2px 2px #aaa;
}
.product{
  min-width: 80px;
}
</style>