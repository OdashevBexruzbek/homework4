document.addEventListener('DOMContentLoaded', () => {
    const searchInput = document.querySelector('.search__input');
    const select = document.querySelector('.search__select');
    const selectList = document.querySelector('.search__select-list');
    const searchSelectSpan = document.querySelector('.search__select span');

    select.addEventListener('click', () => {
        selectList.classList.toggle('visible');
    });

    document.addEventListener('click', (event) => {
        if (!select.contains(event.target)) {
            selectList.classList.remove('visible');
        }
    });

    const searchSelect = document.querySelectorAll('.search__select-list li');

    searchSelect.forEach((li) => {
        li.addEventListener('click', () => {
            searchSelectSpan.textContent = li.textContent;
            let filterAPI;

            if (li.textContent === 'All') {
                filterAPI = 'https://restcountries.com/v3.1/all';
            } else {
                filterAPI = `https://restcountries.com/v3.1/region/${li.textContent}`;
            }

            request(filterAPI).then((data) => {
                createCountries(data);
            }).catch((err) => {
                alert(err.message);
            });

            selectList.classList.remove('visible');
        });
    });

    // Qidiruv funktsiyasi
    searchInput.addEventListener('input', () => {
        const searchText = searchInput.value.toLowerCase();
        const cards = document.querySelectorAll('.cards__item');

        cards.forEach((card) => {
            const countryName = card.querySelector('.cards__title').textContent.toLowerCase();
            if (countryName.includes(searchText)) {
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});
