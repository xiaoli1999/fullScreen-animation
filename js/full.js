/**
 * @file full.js 设置日期
 * @description 全屏动画js
 * @author xiao li
 * @copyright 黎<https://www.xiaoli.vip>
 * @createDate 2023-01-08 16:20
 */

const emoteList = ['🐰', '🐇', '🧨', '🎉', '🏮', '💰', '⛄', '❄']

const innerW = window.innerWidth
const innerH = window.innerHeight

/**
 * @function 生成随机表情元素
 * @returns {{emoteEl: HTMLDivElement, emoteParams: {left: number, top: number, opacity: number, fs: number, transitionDuration: number}}}
 */
const createEmoteElement = () => {
	const fs = 20 + Math.round(Math.random() * 16)
	const left = Math.round(Math.random() * ((innerW - (fs / 2)) - (fs / 2)))
	const top = -fs - 10
	const opacity = ((Math.random() * 16 + 84) / 100).toFixed(2) - 0
	const transitionDuration = 2000 + Math.round(Math.random() * 2000);

	const emoteEl = $('<div></div>').css({
		position: 'absolute',
		color: '#fff',
		top: `${ top }px`,
		left: `${ left }px`,
		fontSize: `${fs }px`,
		opacity: opacity,
		zIndex: 9999,
		textShadow: `0 0 ${ fs / 4 }px #ffffff80`,
		transition: `transform ${ transitionDuration }ms linear`
	}).html(emoteList[Math.round(Math.random() * (emoteList.length - 1))])

	return { emoteEl, emoteParams: { fs, left, top, opacity, transitionDuration } }
}

const setEmoteAnimate = () => {
	const { emoteEl, emoteParams } = createEmoteElement()
	$('body').append(emoteEl)

	const endLeft = emoteParams.left + [-80, 80][Math.round(Math.random())]
	const endTop = innerH - emoteEl.height() + Math.round(Math.random() * 10)
	const moveDuration = innerH * 10 + Math.round(Math.random() * 4000);
	const endScale = 1.2 + ((Math.round(Math.random() * 4) / 10).toFixed(2) - 0);
	const scaleDuration = 1200 + Math.round(Math.random() * 2000);

	emoteEl.animate({ left: `${ endLeft }px`, top: `${ endTop }px`, }, moveDuration, 'linear', () => {
		emoteEl.css({ transform: `scale(${ endScale })` })
			.animate({ opacity: 0 }, scaleDuration, 'linear', () => (emoteEl.remove()))
	})
}

const start = () => setInterval(() => setEmoteAnimate(), 320)

$(document).ready(() => start())
