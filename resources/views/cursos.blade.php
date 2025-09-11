<!DOCTYPE html>
<html lang="pt-BR">
<head>
    <meta charset="utf-8">
    <title>Curso Winove</title>
    @vite(['resources/css/app.css'])
</head>
<body>
    <section>
        <h2>Grade</h2>
        <div id="gradeGrid" class="grid"></div>
    </section>
    <section>
        <h2>Vídeos</h2>
        <div id="videoCategories"></div>
    </section>

    <script>
    const ytLink = (id) => `https://www.youtube.com/watch?v=${id}`;
    const ytThumb = (id) => `https://img.youtube.com/vi/${id}/mqdefault.jpg`;

    const grade = [
        { titulo: 'Introdução', desc: 'Visão geral do curso', videoId: 'dQw4w9WgXcQ' },
        { titulo: 'Módulo Avançado', desc: 'Conteúdo em breve', videoId: '' }
    ];

    const categories = [
        {
            nome: 'Fundamentos',
            cor: '#2E5AAC',
            videos: [
                { id: 'dQw4w9WgXcQ', titulo: 'Apresentação', duracao: '10m', resumo: 'Visão geral do curso' }
            ]
        }
    ];

    function renderGrade(){
      const wrap = document.getElementById('gradeGrid');
      wrap.innerHTML = '';
      grade.forEach(mod => {
        const hasVideo = !!mod.videoId;
        const el = document.createElement('div');
        el.className = 'card';
        el.innerHTML = `
          <span class="tag">${hasVideo ? 'Disponível' : 'Em breve'}</span>
          <h3>${mod.titulo}</h3>
          <p>${mod.desc}</p>
          <div class="actions">${hasVideo ? `<a class="btn btn-sm btn-primary" target="_blank" rel="noopener" href="${ytLink(mod.videoId)}">Assistir no YouTube</a>` : `<button class="btn btn-sm btn-ghost" disabled>Em breve</button>`}</div>
        `;
        wrap.appendChild(el);
      })
    }


    function renderCategories(){
      const root = document.getElementById('videoCategories');
      root.innerHTML = '';
      categories.forEach(cat => {
        const box = document.createElement('div');
        box.className = 'cat';
        box.innerHTML = `<h3 style="color:${cat.cor}">${cat.nome}</h3>`;


        const grid = document.createElement('div');
        grid.className = 'grid';
        grid.style.gridTemplateColumns = 'repeat(2, 1fr)';
        grid.style.gap = '16px';


        cat.videos.forEach(v => {
          const url = ytLink(v.id);
          const card = document.createElement('a');
          card.className = 'video-card';
          card.href = url;
          card.target = '_blank';
          card.rel = 'noopener';
          card.setAttribute('data-yt-id', v.id);


          // Validação leve: força padrão watch?v= e impede links externos acidentais
          if(!/^https:\/\/www\.youtube\.com\/watch\?v=/.test(url)) return;


          card.innerHTML = `
            <img class="thumb" alt="${v.titulo}" src="${ytThumb(v.id)}" loading="lazy" />
            <div class="video-content">
              <div class="video-meta">
                <span class="pill">${v.duracao || ''}</span>
                <span class="pill">Canal Winove</span>
              </div>
              <h4 style="margin:8px 0 6px">${v.titulo}</h4>
              <p>${v.resumo || ''}</p>
            </div>
          `;
          grid.appendChild(card);
        });
        box.appendChild(grid);
        root.appendChild(box);
      });
    }


    // FAQ toggle
    document.addEventListener('click', (e)=>{
      if(e.target.matches('.acc-btn')){
        const item = e.target.closest('.acc-item');
        item.classList.toggle('open');
      }
    });


    renderGrade();
    renderCategories();
  </script>
</body>
</html>
