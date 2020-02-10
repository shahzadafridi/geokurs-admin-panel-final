<!DOCTYPE html>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>

<!--    <script type="text/javascript" src="--><?php //echo base_url(); ?><!--assets/js/jquery.min.js" ></script>-->
<!--    <!-- search autocomplete libraries -->-->
<!--    <script type="text/javascript" src="--><?php //echo base_url(); ?><!--assets/js/jquery-ui.js" defer="defer" ></script>-->
<!--    <!-- twitter typeahead libraries files -->-->
<!--    <link href="--><?php //echo base_url(); ?><!--assets/typeahead/css/typeahead_mystyle.css" rel="stylesheet" type="text/css" />-->
<!--    <script type="text/javascript" src="--><?php //echo base_url(); ?><!--assets/typeahead/common/utils.js" ></script>-->
<!--    <script type="text/javascript" src="--><?php //echo base_url(); ?><!--assets/typeahead/typeahead/typeahead.jquery.min.js" ></script>-->
<!--    <script type="text/javascript" src="--><?php //echo base_url(); ?><!--assets/typeahead/bloodhound/version.js" ></script>-->
<!--    <script type="text/javascript" src="--><?php //echo base_url(); ?><!--assets/typeahead/bloodhound/options_parser.js" ></script>-->
<!--    <script type="text/javascript" src="--><?php //echo base_url(); ?><!--assets/typeahead/bloodhound/lru_cache.js" ></script>-->
<!--    <script type="text/javascript" src="--><?php //echo base_url(); ?><!--assets/typeahead/bloodhound/transport.js" ></script>-->
<!--    <script type="text/javascript" src="--><?php //echo base_url(); ?><!--assets/typeahead/bloodhound/persistent_storage.js" ></script>-->
<!--    <script type="text/javascript" src="--><?php //echo base_url(); ?><!--assets/typeahead/bloodhound/search_index.js" ></script>-->
<!--    <script type="text/javascript" src="--><?php //echo base_url(); ?><!--assets/typeahead/bloodhound/tokenizers.js" ></script>-->
<!--    <script type="text/javascript" src="--><?php //echo base_url(); ?><!--assets/typeahead/bloodhound/bloodhound.js" ></script>-->
    <script src="https://twitter.github.io/typeahead.js/js/jquery-1.10.2.min.js"></script>
    <script src="https://twitter.github.io/typeahead.js/releases/latest/typeahead.bundle.js"></script>
</head>
<body>
<!-- search box area for normal -->
<div class="header-middle-right">

<!-- search box -->
<div class="search-area" id="remote" style="width:545px;margin-right:50px;">
  <form action="#" method="get" class="search_box">
      <input class="search-field typeahead" type="text" value="" name="q" placeholder="Search..." style="width:500px;" />
      <input class="search-btn" type="submit" value="search" />
  </form>
    <span class="waiting_msg" style="height:20px;border:solid 1px transparent;">
        <!-- loading... -->
        <img src='assets/images/loading.gif' width='25' height='20' style='margin-bottom:-5px;' alt="Loader" />
    </span>
    <script type="text/javascript">
        $( 'span.waiting_msg img' ).hide();
        $( 'form.search_box' ).on( 'submit', function() { $( 'span.waiting_msg img' ).show(); });
    </script>
</div>
<!-- end: search box -->

<div class="top-cart">
    <a href="<?php echo site_url('cart/'); ?>" >
        <img src="<?php echo base_url(); ?>assets/images/cart-icon-large.png" alt="Cart" width="47" height="33" />
    </a>
    <span class="cart-count">
        <a href="<?php echo site_url('cart/'); ?>" style="color:#fff;text-decoration:none;">
            <?php echo count($this->cart->contents()); ?>
        </a>
    </span>
</div>

</div>

<script type="text/javascript">
  /*== twitter typeahead==*/
$(document).ready(function(){

    var products = new Bloodhound({
        datumTokenizer: function (datum) {
            return Bloodhound.tokenizers.whitespace(datum.tokens.join(' '));
        },
        queryTokenizer: Bloodhound.tokenizers.whitespace,
        remote: {
            url: "<?php echo site_url('products/typeahead_search/%QUERY'); ?>",
            filter: function (data) {
                return $.map(data.results, function (product) {

                    var price = product.price;
                    if(product.vformoney == 1) {
                        price = product.vprice +" <span style='color:#ff0000;font-size:14px;text-decoration:line-through;'>"+ product.price +"</span>";
                    }

                    return {
                        label: "<img src='<?php echo base_url(); ?>assets/images/"+product.promotion_pic+"' width='40' height='40' /><p class='model'>"+ product.product_name +"</p><p class='price'>AED: " + price +"</p><p class='product_name'></p>",
                        value: product.product_name
                    };
                });
            }
        },

        limit: 7

    });

    products.initialize();



    $('#remote .typeahead').typeahead({
        hint: true,
        highlight: true,
        minLength: 1
    }, {
        name: 'products',
        displayKey: 'label',
        source: products.ttAdapter()
    });

    /*$('#remote .typeahead').on('typeahead:opened', function(event, datum) {
        var width = $("form.search_box").width();
        $('.tt-dropdown-menu').width(width - 5);
    });*/

    $('#remote .typeahead').on('typeahead:opened', function(event, datum) {
        var width = $(this).width();
        $('.tt-dropdown-menu').width(width + 30);
    });

    $('#remote .typeahead').on('typeahead:selected', function (event, datum) {
        $('#remote .tt-input').val(datum.value);
        //console.log(datum.value);
    });

    $('#remote .typeahead').on('typeahead:cursorchanged', function (event, datum) {
        $('#remote .tt-input').val(datum.value);
        //console.log(datum);
    });

    $('#remote .typeahead').focusout(function(){
        var v = $('#remote .typeahead').typeahead('val', $('#remote .tt-input').val());
        $('#remote .typeahead').val(v);
    });


});


    /*=== updated script ===*/

    $('div.navigation a.pm').hover(function() {

        //on hover parent menu get first child image.
        var first_child_image = $(this).next().find( 'a:first' ).attr( 'id' );

        $(this).next().find( 'a:first' ).addClass( 'active' );
        $(this).next().find( 'div.auto:first' ).css('background', 'url(<?php echo base_url(); ?>assets/images/'+first_child_image+') no-repeat');
        $(this).next().find( 'div.auto:first' ).css('display', 'block');


    }, function() {
            $(this).next().find( 'a:first' ).addClass( '' );
            $(this).next().find( 'div.auto:first' ).css('display', 'none');
        });

    $('div.navigation a.cm').hover(function() {
        if($(this).attr('id') !== "") {

            $( '.parent-nav div.auto' ).css('background', 'url(<?php echo base_url(); ?>assets/images/'+$(this).attr('id')+') no-repeat');

        }
    });


    /*=== end: updated script ===*/

</script>
</body>
</html>