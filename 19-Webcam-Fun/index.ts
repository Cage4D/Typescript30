const video = document.querySelector<HTMLVideoElement>('.player');
const canvas = document.querySelector<HTMLCanvasElement>('.photo');
const ctx = canvas!.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');