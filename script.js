document.addEventListener('DOMContentLoaded', e => {
	const textarea = document.querySelector('#preview-box');
	const borderRadiusButtons = document.querySelectorAll('.border-radius-changer');
	const getCodeBtn = document.querySelector('#get-code');
	const linkAllBtn = document.querySelector('#link-all');


	let t = {
		'top-right': 0,
		'top-left': 0,
		'bottom-right': 0,
		'bottom-left': 0
	}

	borderRadiusButtons.forEach(btn => {
		btn.addEventListener('input', e => {
			const value = parseInt(btn.value);
			const id = btn.id;
			if (value) {
				if (!linkAllBtn.checked) {
					textarea.style.cssText += `border-${id}-radius: ${value}px`;					
				} else {
					textarea.style.cssText += `border-radius: ${value}px`;
				}
				t[id] = value;
			}
			if (linkAllBtn.checked) {
				[...borderRadiusButtons].map(b => {
					b.value = value;
				})
			}
		})
	})

	if (linkAllBtn.checked) {
		textarea.style.cssText = `border-radius: ${document.querySelector('#top-right').value}px;`;
	}

	linkAllBtn.addEventListener('change', e => {
		if (e.target.checked) {
			borderRadiusButtons.forEach(b => {
				if (b.value) {
					[...borderRadiusButtons].map(_b => {
						_b.value = b.value;
					})
				}
			})
		}
	})

	getCodeBtn.addEventListener('click', e => {
		textarea.textContent = '';
		if (linkAllBtn.checked) {
			textarea.textContent = `border-radius: ${document.querySelector('#top-right').value}px;`;
		} else {
			Object.keys(t).forEach((v) => {
				textarea.textContent += `border-${v}-radius: ${t[v]}px;\n`;
			})
		}
	})
})