(function () {
  const navToggle = document.querySelector('[data-nav-toggle]');
  const nav = document.querySelector('[data-nav]');

  if (navToggle && nav) {
    navToggle.addEventListener('click', function () {
      nav.classList.toggle('open');
      const expanded = nav.classList.contains('open');
      navToggle.setAttribute('aria-expanded', String(expanded));
    });
  }

  const reveals = document.querySelectorAll('.reveal');
  const io = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('show');
        }
      });
    },
    { threshold: 0.18 }
  );

  reveals.forEach(function (item) {
    io.observe(item);
  });

  const counters = document.querySelectorAll('[data-counter]');
  counters.forEach(function (counter) {
    const target = Number(counter.getAttribute('data-counter'));
    let current = 0;
    const step = Math.max(1, Math.floor(target / 60));

    const run = function () {
      current += step;
      if (current > target) {
        current = target;
      }
      counter.textContent = String(current);
      if (current < target) {
        requestAnimationFrame(run);
      }
    };

    const obs = new IntersectionObserver(function (entries) {
      if (entries[0].isIntersecting) {
        run();
        obs.disconnect();
      }
    });

    obs.observe(counter);
  });

  const parallax = document.querySelectorAll('[data-parallax]');
  window.addEventListener('scroll', function () {
    const y = window.scrollY;
    parallax.forEach(function (el) {
      const speed = Number(el.getAttribute('data-parallax')) || 0.08;
      el.style.transform = 'translateY(' + y * speed + 'px)';
    });
  });
})();
