/* global $ */
$(document).ready(() => {
    $(`#contact-submit`).click(() => {
        $(`#contact-us`).modal(`hide`);
        $(`#email-sent`).modal(`show`);
    })
    $(`#save-btn`).click(() => $(`#enter-comments`).modal(`hide`));
    $(`.search`).keyup(() => {
        const searchTerm = $(`.search`).val();
        const searchSplit = searchTerm.replace(/ /g, `'):containsi('`);
        $.extend($.expr[`:`], {
            'containsi': (elem, i, match, array) => (elem.textContent || elem.innerText || ``).toLowerCase().indexOf((match[3] || ``).toLowerCase()) >= 0
        });
        $(`.results tbody tr`).not(`:containsi('` + searchSplit + `')`).each(() => $(this).attr(`visible`, `false`));
        $(`.results tbody tr:containsi('` + searchSplit + `')`).each(() => $(this).attr(`visible`, `true`));
        const jobCount = $(`.results tbody tr[visible="true"]`).length;
        $(`.counter`).text(jobCount !== 1 ? `Found ${jobCount} items` : `Found ${jobCount} item`);
        if (jobCount === 0) {
            $(`no-result`).show();
        } else {
            $(`no-result`).hide();
        }
    })
})