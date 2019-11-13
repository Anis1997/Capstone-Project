<template>
<!-- Franchises Grid -->
 <section class="bg-light page-section" id="franchises">
    <div class="container">
      <div class="row">
        <div class="col-lg-12 text-center">
          <h2 class="section-heading text-uppercase">Franchises</h2>
          <h3 class="section-subheading text-muted">Select your store</h3>
        </div>
      </div>
      <div class="row">

        <div class="col-md-8 col-sm-4 portfolio-item" v-for="(obj, key) in json" :key="key">
          <a class="portfolio-link" data-toggle="modal" href="/cart/touslesjous">
            <div class="portfolio-hover">
              <div class="portfolio-hover-content">
                <i class="fas fa-plus fa-3x"></i>
              </div>
            </div>
            <img class="img-fluid" src="img/portfolio/01-thumbnail.jpg" alt="" >
          </a>
          <div class="portfolio-caption">
            <h4>{{obj.caption}}</h4>
            <p class="text-muted">{{obj.title}}</p>
          </div>
        </div>
        <div class="col-md-8 col-sm-4 portfolio-item">
          <a class="portfolio-link" data-toggle="modal" href="/cart/parisbaguette">
            <div class="portfolio-hover">
              <div class="portfolio-hover-content">
                <i class="fas fa-plus fa-3x"></i>
              </div>
            </div>

          </a>
        </div>
      </div>
    </div>
  </section>  
</template>



<script>
export default {
    data: () => ({
        json: [
{
                img: 'https://cdn.phonebooky.com/blog/wp-content/uploads/2018/07/22163219/Screen-Shot-2018-10-22-at-2.33.54-PM.png',
                caption: 'Tous les Jous',
                title: 'Fresh Bakery Everyday'
            },
            {
                img: 'https://assets.digitalservices.ggp.com/content/dam/rw-2/images/tenant-images/tenant-logos/paris-baguette-logo-553x260.png',
                caption: 'Paris Baguette',
                title: 'Taste the Difference'
            }

        ]
    })
    
}


</script>


<style lang="css">

</style>
 