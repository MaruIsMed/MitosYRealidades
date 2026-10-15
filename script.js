document.addEventListener("DOMContentLoaded", () => {
    // =========================================================================
    // 1. FONDO ANIMADO CON CANVAS (Red Geométrica / Partículas Flotantes)
    // =========================================================================
    const canvas = document.getElementById("bg-canvas");
    if (canvas) {
      const ctx = canvas.getContext("2d");
      let particles = [];
  
      function resizeCanvas() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
  
      resizeCanvas();
      window.addEventListener("resize", resizeCanvas);
  
      // Crear partículas
      const particleCount = Math.min(Math.floor(window.innerWidth / 25), 45);
      for (let i = 0; i < particleCount; i++) {
        particles.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          radius: Math.random() * 2.5 + 1.5,
        });
      }
  
      function animateCanvas() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
  
        // Dibujar y mover partículas
        particles.forEach((p, index) => {
          p.x += p.vx;
          p.y += p.vy;
  
          if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
          if (p.y < 0 || p.y > canvas.height) p.vy *= -1;
  
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(131, 153, 88, 0.4)"; // Moss Green
          ctx.fill();
  
          // Dibujar líneas conectoras entre partículas cercanas
          for (let j = index + 1; j < particles.length; j++) {
            const p2 = particles[j];
            const dx = p.x - p2.x;
            const dy = p.y - p2.y;
            const dist = Math.sqrt(dx * dx + dy * dy);
  
            if (dist < 130) {
              ctx.beginPath();
              ctx.moveTo(p.x, p.y);
              ctx.lineTo(p2.x, p2.y);
              ctx.strokeStyle = `rgba(16, 86, 102, ${0.15 * (1 - dist / 130)})`;
              ctx.lineWidth = 0.8;
              ctx.stroke();
            }
          }
        });
  
        requestAnimationFrame(animateCanvas);
      }
  
      animateCanvas();
    }
  
    // =========================================================================
    // 2. MAPA INTERACTIVO CON LEAFLET.JS (Ciudad Judicial de Puebla)
    // =========================================================================
    const mapElement = document.getElementById("map");
    if (mapElement && typeof L !== "undefined") {
      // Coordenadas exactas de Ciudad Judicial Puebla (San Andrés Cholula / Puebla)
      const pueblaJudicial = [18.9958, -98.2435];
  
      const map = L.map("map").setView(pueblaJudicial, 15);
  
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: '© OpenStreetMap colaboradores',
      }).addTo(map);
  
      // Marcador informativo
      const marker = L.marker(pueblaJudicial).addTo(map);
      marker
        .bindPopup(
          `<b>Ciudad Judicial del Estado de Puebla</b><br>Sede de los Juzgados de lo Familiar.<br><i>Lugar de tramitación del divorcio incausado.</i>`
        )
        .openPopup();
    }
  
    // =========================================================================
    // 3. RESALTADO AUTOMÁTICO EN LA NAVEGACIÓN SEGÚN SCROLL
    // =========================================================================
    const sections = document.querySelectorAll("main section");
    const navLinks = document.querySelectorAll("nav ul li a");
  
    window.addEventListener("scroll", () => {
      let current = "";
  
      sections.forEach((section) => {
        const sectionTop = section.offsetTop;
        if (window.pageYOffset >= sectionTop - 160) {
          current = section.getAttribute("id");
        }
      });
  
      navLinks.forEach((link) => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
          link.classList.add("active");
        }
      });
    });
  
    // =========================================================================
    // 4. BOTÓN FLOTANTE "VOLVER ARRIBA"
    // =========================================================================
    const topBtn = document.createElement("button");
    topBtn.innerHTML = "&#8593;";
    topBtn.className = "back-to-top";
    topBtn.setAttribute("aria-label", "Volver al inicio");
    document.body.appendChild(topBtn);
  
    window.addEventListener("scroll", () => {
      if (window.scrollY > 300) {
        topBtn.style.display = "block";
      } else {
        topBtn.style.display = "none";
      }
    });
  
    topBtn.addEventListener("click", () => {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    });
  });