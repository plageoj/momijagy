"use strict";
const jigenRawData = document.getElementsByClassName('kyuko-date-jigen')
if (jigenRawData.length) download()

const frame = document.getElementsByName('topmenu')[0]

frame.addEventListener('load', () => {
    frame.contentDocument.getElementById('timeout').parentElement.parentElement.innerText = "タイムアウト抑制中"
    setTimeout(() => {
        frame.contentWindow.location.reload()
    }, 1700000)
})