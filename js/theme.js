document.querySelector('.js-copy').addEventListener( 'click', async () => {
    const ip = document.querySelector('#visitor-ip').value;
    await navigator.clipboard.writeText( ip );
});

