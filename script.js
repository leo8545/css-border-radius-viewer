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

	linkAllBtn.addEventListener('change', e => {
		textarea.textContent = '';
		if (e.target.checked) {
			let c = [...borderRadiusButtons].filter(b => b.value);
			[...borderRadiusButtons].map(_b => {
				_b.value = c[0].value;
			})
			textarea.style.borderRadius = `${c[0].value}px`;
		}
	})

	getCodeBtn.addEventListener('click', e => {
		textarea.textContent = '';
		if (linkAllBtn.checked) {
			textarea.textContent = `border-radius: ${document.querySelector('#top-right').value}px;`;
		} else {
			Object.keys(t).forEach((v) => {
				textarea.textContent += `border-${v}-radius: ${document.querySelector(`#${v}`).value}px;\n`;
			})
		}
	})
})