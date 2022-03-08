const options = document.forms['options-form'];
let state;

if (window.GTARooster) {
    var x =
        '<p><u>Lorem, ipsum dolor sit amet consectetur adipisicing elit. Ab nisi eaque rem iste facilis, reiciendis error? Sit quis delectus, quibusdam, voluptate reiciendis dolore architecto consectetur necessitatibus expedita, autem doloremque culpa.</u><br>\nAssumenda ab voluptatem laboriosam sunt explicabo laborum ratione voluptates expedita obcaecati blanditiis numquam inventore, deserunt ex a nobis qui perspiciatis cupiditate dolore incidunt quae ipsam. Labore, consequatur? Corporis, facilis voluptas!<br>\nMinus obcaecati, ratione accusamus tempore sit excepturi et, nobis saepe rerum autem ab impedit! Nam provident laborum explicabo est illo temporibus nisi vitae ipsum amet voluptatibus minima, ex dicta sint.<br>\nVero saepe architecto quam optio voluptatem non quaerat cupiditate, ab temporibus aperiam nostrum necessitatibus corrupti beatae porro velit harum? Corporis a minima molestias quis minus tempora et quidem accusamus beatae.<br>\n<strong>Laudantium facere obcaecati recusandae, magni necessitatibus officia consequuntur modi. Doloremque modi nam voluptates quisquam aspernatur consectetur incidunt nostrum illo animi cumque ab numquam, dolor excepturi quia similique repellat in laudantium.</strong></p>\n\n<p> </p>\n\n<p><br>\n<strong>Quisquam temporibus explicabo eius! Adipisci doloribus, sunt facilis aperiam repudiandae animi numquam dolores est esse ullam? Asperiores minus, quia cupidit</strong>ate, blanditiis libero veritatis, itaque mollitia quaerat omnis nostrum necessitatibus distinctio!<br>\nExpedita, laudantium? Neque soluta, deserunt rerum recusandae molestiae, cum excepturi ad repellat minima doloribus unde molestias nobis praesentium repudiandae voluptatibus consectetur, beatae ipsum voluptatem assumenda illo provident veniam dolorem! Vel.<br>\nConsequatur at accusantium voluptates officiis molestias perspiciatis amet possimus iste eius distinctio ex nobis quaerat aperiam porro similique rem sit velit doloribus quisquam voluptatum quae, odit corrupti nam? Corporis, dicta.<br>\nEos excepturi odio ullam quis molestias in illum, at consequatur animi suscipit autem cum quam dolor optio perferendis <em>perspiciatis quia aliquid</em> minus explicabo nemo aliquam odit ab! Quia, reiciendis dolore!<br>\nMolestiae veniam autem fugiat consequatur, sequi doloribus error possimus, praesentium quis placeat, optio officia dolore eum tenetur. Tempore quidem, amet ex minima atque, nostrum nulla aliquid numquam, exercitationem a sint.</p>';
    var rootElement = document.querySelector('#editor');
    var EditorInstance = GTARooster.RoosterEditor;
    var config = {
        width: '90%',
        height: '500px',
        toolbar: {
            bold: true,
            italic: true,
            underline: true,
            insertImage: (file) => file,
            strikeThrough: true,
            numbering: true,
            bullet: true,
            indent: true,
            outdent: true,
            alignLeft: true,
            alignCenter: true,
            alignRight: true,
        },
    };
    var editor = new EditorInstance(rootElement, config);
    editor.mount();
    editor.setContent(x);
    window.editor = editor;

    options.addEventListener('submit', function (event) {
        event.preventDefault();
        window.editor.unmount();

        const elements = Array.from(event.currentTarget);

        state = elements.reduce((acc, el) => {
            if (el.name && el.checked) {
                acc[el.name] = el.checked;
            }
            return acc;
        }, {});

        const rootElement = document.querySelector('#editor');
        const config = {
            width: '90%',
            height: '500px',
            readonly: state.readonly,
            toolbar: {
                ...state,
            },
        };
        var editor = new EditorInstance(rootElement, config);
        editor.mount();
        window.editor = editor;

        const codeContent = document.querySelector('#code-content');
        codeContent.parentElement.classList.remove('hide');
        codeContent.innerText = JSON.stringify(config, null, 2);
        if (Object.keys(state).length !== 0) {
            document.querySelector('.toolbar').classList.add('animate-toolbar');
            window.scrollTo(0, 0, {
                behavior: 'smooth',
            });
        }
    });

    document
        .querySelector('#getcontent')
        .addEventListener('click', function () {
            const htmlContent = document.querySelector('#show-content');
            htmlContent.parentElement.classList.remove('hide');
            document.querySelector('#show-content').innerText =
                window.editor.getContent();
        });

    document
        .querySelector('#toolbar-options-all')
        .addEventListener('click', () => {
            options.querySelectorAll('input[type="checkbox"]').forEach((el) => {
                console.log(el);
                if (el.name === 'readonly') return;
                el.toggleAttribute('checked');
            });
        });
}
