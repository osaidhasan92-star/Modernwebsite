(function($){
function shell(){
 const path=location.pathname.split('/').pop()||'index.html';
 const active=path==='index.html'?'Home':path==='about.html'?'About Us':path==='contact.html'?'Contact Us':'Products';
 const menu=categories.map(c=>`<a href="products.html?cat=${encodeURIComponent(c[1])}"><i class="bi ${c[2]}"></i>${c[0]}</a>`).join('');
 $('#siteHeader').html(`<div class="topbar"><div class="container topin"><div><i class="bi bi-telephone"></i><span>+971 50 254 2258</span><i class="bi bi-telephone"></i><span>+971 4 347 4484</span></div><div><i class="bi bi-envelope"></i> connect@mktgt.com</div></div></div><nav class="nav"><div class="container navin"><a class="logo logo-image" href="index.html" aria-label="Modern Services and Trading"><img src="assets/logo/modern-services-trading.png" alt="Modern Services and Trading"></a><button class="hamb" aria-label="Menu"><i class="bi bi-list"></i></button><div class="navlinks"> <a class="${active==='Home'?'active':''}" href="index.html">Home</a><a class="${active==='About Us'?'active':''}" href="about.html">About Us</a><div class="navdrop"><a class="${active==='Products'?'active':''}" href="products.html">Products <i class="bi bi-chevron-down"></i></a><div class="dropdown">${menu}</div></div><a href="brands.html">Brands</a><a class="${active==='Contact Us'?'active':''}" href="contact.html">Contact Us</a></div><div class="navsearch"><i class="bi bi-search"></i><input id="globalSearch" placeholder="Search Product"></div></div></nav>`);
 $('#siteFooter').html(`<footer class="footer"><div class="container footgrid"><div><a class="logo logo-image" href="index.html" aria-label="Modern Services and Trading"><img src="assets/logo/modern-services-trading.png" alt="Modern Services and Trading"></a><p>Premium food products, trusted sourcing and reliable distribution across the UAE and GCC.</p></div><div><h4>QUICK LINKS</h4><a href="about.html">About Us</a><a href="products.html">Products</a><a href="brands.html">Our Brands</a><a href="contact.html">Contact Us</a></div><div><h4>GET IN TOUCH</h4><p>+971 4 347 44 84</p><p>+971 50 254 2258</p><p>connect@mktgt.com</p><p>Po Box 234174, Ras Al Khor Industrial Area 2, Dubai</p></div></div><div class="copyright">© 2026 Modern Services and Trading L.L.C. All rights reserved.</div></footer>`);
}
function home(){
 if(!$('#heroSlider').length)return;
 const images={
  beef:'https://images.pexels.com/photos/112781/pexels-photo-112781.jpeg?auto=compress&cs=tinysrgb&w=2000',
  seafood:'https://images.pexels.com/photos/20810997/pexels-photo-20810997.jpeg?auto=compress&cs=tinysrgb&w=2000',
  fries:'https://images.pexels.com/photos/8880735/pexels-photo-8880735.jpeg?auto=compress&cs=tinysrgb&w=2000'
 };
 const slides=[
  ['BRINGING WORLD-CLASS PREMIUM QUALITY FOOD PRODUCTS TO STAR KITCHENS','', 'products.html',images.beef],
  ['YOUR ONE-STOP FOOD SUPPLY PARTNER','', 'products.html',images.seafood],
  ['PREMIUM PRODUCTS FOR PROFESSIONAL KITCHENS','', 'contact.html',images.fries]
 ];
 $('#heroSlider').html(slides.map((s,i)=>`<div class="hero-slide ${i===0?'active':''}" style="background-image:linear-gradient(90deg,rgba(0,0,0,.50) 0%,rgba(0,0,0,.22) 55%,rgba(0,0,0,.28) 100%),url('${s[3]}');background-size:cover;background-position:center"><div class="hero-content"><h1>${s[0]}</h1>${s[1]?`<p>${s[1]}</p>`:''}</div></div>`).join(''));
 $('#heroSlider').append('<button class="hero-arrow hero-prev" type="button" aria-label="Previous slide"><i class="bi bi-chevron-left"></i></button><button class="hero-arrow hero-next" type="button" aria-label="Next slide"><i class="bi bi-chevron-right"></i></button>');
 $('#heroDots').html('');
 let current=0,timer;
 function go(n){current=(n+slides.length)%slides.length;$('.hero-slide').removeClass('active').eq(current).addClass('active');}
 function restart(){clearInterval(timer);timer=setInterval(()=>go(current+1),6000)}
 $('#heroSlider').on('click','.hero-prev',function(){go(current-1);restart()});
 $('#heroSlider').on('click','.hero-next',function(){go(current+1);restart()});
 $('#heroSlider').on('mouseenter',function(){clearInterval(timer)}).on('mouseleave',restart);
 restart();
 const categoryImages={
  appetizers:'https://images.pexels.com/photos/8880735/pexels-photo-8880735.jpeg?auto=compress&cs=tinysrgb&w=900',
  'frozen-meat':'https://images.pexels.com/photos/112781/pexels-photo-112781.jpeg?auto=compress&cs=tinysrgb&w=900',
  poultry:'https://images.pexels.com/photos/6107734/pexels-photo-6107734.jpeg?auto=compress&cs=tinysrgb&w=900',
  seafood:'https://images.pexels.com/photos/20810997/pexels-photo-20810997.jpeg?auto=compress&cs=tinysrgb&w=900',
  'processed-meat':'https://images.pexels.com/photos/112781/pexels-photo-112781.jpeg?auto=compress&cs=tinysrgb&w=900',
  fries:'https://images.pexels.com/photos/8880735/pexels-photo-8880735.jpeg?auto=compress&cs=tinysrgb&w=900',
  vegetables:'https://images.pexels.com/photos/31717503/pexels-photo-31717503.jpeg?auto=compress&cs=tinysrgb&w=900',
  fruits:'https://images.pexels.com/photos/13644025/pexels-photo-13644025.jpeg?auto=compress&cs=tinysrgb&w=900'
 };
 $('#homeCategories').html(categories.slice(0,8).map(c=>`<a class="category-card category-image-card" href="products.html?cat=${c[1]}" style="background-image:linear-gradient(180deg,rgba(0,40,25,.05),rgba(0,45,30,.82)),url('${categoryImages[c[1]]||images.fries}')"><div class="category-card-overlay"><div class="category-icon"><i class="bi ${c[2]}"></i></div><h3>${c[0]}</h3><span>Explore range</span></div></a>`).join(''));
}
function productPage(){if(!$('#productGrid').length)return; const imageMap={
 'frozen-meat':'https://images.pexels.com/photos/112781/pexels-photo-112781.jpeg?auto=compress&cs=tinysrgb&w=900',
 poultry:'https://images.pexels.com/photos/6107734/pexels-photo-6107734.jpeg?auto=compress&cs=tinysrgb&w=900',
 seafood:'https://images.pexels.com/photos/20810997/pexels-photo-20810997.jpeg?auto=compress&cs=tinysrgb&w=900',
 'processed-meat':'https://images.pexels.com/photos/112781/pexels-photo-112781.jpeg?auto=compress&cs=tinysrgb&w=900',
 fries:'https://images.pexels.com/photos/8880735/pexels-photo-8880735.jpeg?auto=compress&cs=tinysrgb&w=900',
 vegetables:'https://images.pexels.com/photos/31717503/pexels-photo-31717503.jpeg?auto=compress&cs=tinysrgb&w=900',
 fruits:'https://images.pexels.com/photos/9814690/pexels-photo-9814690.jpeg?auto=compress&cs=tinysrgb&w=900',
 dairy:'https://images.pexels.com/photos/4187780/pexels-photo-4187780.jpeg?auto=compress&cs=tinysrgb&w=900',
 'uht-creams':'https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&w=900',
 'dry-products':'https://images.pexels.com/photos/11296793/pexels-photo-11296793.jpeg?auto=compress&cs=tinysrgb&w=900',
 cheeses:'https://images.pexels.com/photos/4187780/pexels-photo-4187780.jpeg?auto=compress&cs=tinysrgb&w=900',
 appetizers:'https://images.pexels.com/photos/8880735/pexels-photo-8880735.jpeg?auto=compress&cs=tinysrgb&w=900'
 }; let per=12,page=1,params=new URLSearchParams(location.search),cat=params.get('cat')||'',q=params.get('q')||'';$('#productSearch').val(q);$('#filterList').html(`<button data-cat="" class="${!cat?'active':''}">All Categories</button>`+categories.map(c=>`<button data-cat="${c[1]}" class="${cat===c[1]?'active':''}">${c[0]}</button>`).join(''));
 function render(){let list=products.filter(p=>(!cat||p.slug===cat)&&(!q||p.name.toLowerCase().includes(q.toLowerCase()))),pages=Math.max(1,Math.ceil(list.length/per));page=Math.min(page,pages);let start=(page-1)*per;$('#resultCount').text(`${list.length} products`);$('#productGrid').html(list.slice(start,start+per).map(p=>{let ic=categories.find(c=>c[1]===p.slug)?.[2]||'bi-box';let image=p.image||imageMap[p.slug]; let art=image?`<img src="${image}" alt="${p.name}" loading="lazy">`:`<i class="bi ${ic}"></i>`;return `<article class="product-card"><a class="product-art" href="product-detail.html?id=${p.id}">${art}</a><div class="product-body"><small>${p.category}</small><h3>${p.name}</h3><a href="product-detail.html?id=${p.id}">READ MORE <i class="bi bi-arrow-right"></i></a></div></article>`}).join('')||'<div class="empty">No products found.</div>');$('#pagination').html(Array.from({length:pages},(_,i)=>`<button data-page="${i+1}" class="${i+1===page?'active':''}">${i+1}</button>`).join(''))}
 $('#productSearch').on('input',function(){q=this.value;page=1;render()});$('#filterList').on('click','button',function(){cat=$(this).data('cat')||'';page=1;$('#filterList button').removeClass('active');$(this).addClass('active');render()});$('#pagination').on('click','button',function(){page=+$(this).data('page');render();$('html,body').animate({scrollTop:$('.products-area').offset().top-100},250)});render();
}
function detail(){if(!$('#detailTitle').length)return;let id=+(new URLSearchParams(location.search).get('id')||1),p=products.find(x=>x.id===id)||products[0],ic=categories.find(c=>c[1]===p.slug)?.[2]||'bi-box';$('#detailTitle').text(p.name);$('#detailCat').text(p.category);$('#detailDesc').text(p.desc);const imageMap={'frozen-meat':'https://images.pexels.com/photos/112781/pexels-photo-112781.jpeg?auto=compress&cs=tinysrgb&w=1200',poultry:'https://images.pexels.com/photos/6107734/pexels-photo-6107734.jpeg?auto=compress&cs=tinysrgb&w=1200',seafood:'https://images.pexels.com/photos/20810997/pexels-photo-20810997.jpeg?auto=compress&cs=tinysrgb&w=1200','processed-meat':'https://images.pexels.com/photos/112781/pexels-photo-112781.jpeg?auto=compress&cs=tinysrgb&w=1200',fries:'https://images.pexels.com/photos/8880735/pexels-photo-8880735.jpeg?auto=compress&cs=tinysrgb&w=1200',vegetables:'https://images.pexels.com/photos/31717503/pexels-photo-31717503.jpeg?auto=compress&cs=tinysrgb&w=1200',fruits:'https://images.pexels.com/photos/9814690/pexels-photo-9814690.jpeg?auto=compress&cs=tinysrgb&w=1200',dairy:'https://images.pexels.com/photos/4187780/pexels-photo-4187780.jpeg?auto=compress&cs=tinysrgb&w=1200','uht-creams':'https://images.pexels.com/photos/773253/pexels-photo-773253.jpeg?auto=compress&cs=tinysrgb&w=1200','dry-products':'https://images.pexels.com/photos/11296793/pexels-photo-11296793.jpeg?auto=compress&cs=tinysrgb&w=1200',cheeses:'https://images.pexels.com/photos/4187780/pexels-photo-4187780.jpeg?auto=compress&cs=tinysrgb&w=1200',appetizers:'https://images.pexels.com/photos/8880735/pexels-photo-8880735.jpeg?auto=compress&cs=tinysrgb&w=1200'}; const image=p.image||imageMap[p.slug]; $('#detailImage').html(image?`<img src="${image}" alt="${p.name}">`:`<i class="bi ${ic}"></i>`);$('#metaBrand').text(p.brand);$('#metaPacking').text(p.packing);$('#metaOrigin').text(p.origin);$('#quoteProduct').val(p.name);$('#pageTitle').text(p.name);}
function brands(){if(!$('#brandsGrid').length)return;let names=['Ken Foods','Mondelle','Fletcher','GJ','Friboi','Minerva Foods','Nowaco','Pena Branca','Swift','Hayat'];$('#brandsGrid').html(names.map(n=>`<div class="brand-chip">${n}</div>`).join(''));}
function bind(){ $(document).on('click','.hamb',()=>$('.navlinks').toggleClass('show')); $(document).on('click','.navdrop>a',function(e){if(innerWidth<681){e.preventDefault();$('.navdrop').toggleClass('open')}}); $(document).on('keypress','#globalSearch',function(e){if(e.which===13)location.href='products.html?q='+encodeURIComponent(this.value)}); $(document).on('submit','.quote-form',function(e){e.preventDefault();$(this).find('.notice').text('Thank you. Your enquiry is ready to connect to your email/API.').show();});}
$(function(){shell();home();productPage();detail();brands();bind();});
})(jQuery);
