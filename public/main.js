const cards = document.querySelectorAll(".card");

cards.forEach(card => {
  card.addEventListener("click", event => {
    event.currentTarget.classList.add("card--flip");
  });
});

/* <div class="game__row">
<div class="card card--hard">
<div class="card--front"></div>
<img class="card--back" src="images/chan_yu.jpg" alt="">
</div>
<div class="card card--hard">
<div class="card--front"></div>
<img class="card--back" src="images/chi_fu.jpeg" alt="">
</div>
<div class="card card--hard">
<div class="card--front"></div>
<img class="card--back" src="images/mulan.jpg" alt="">
</div>
<div class="card card--hard">
<div class="card--front"></div>
<img class="card--back" src="images/mushu.jpg" alt="">
</div>
<div class="card card--hard">
<div class="card--front"></div>
<img class="card--back" src="images/ling.jpg" alt="">
</div>
</div> */
