let open = $state(false)
let dark = $state(false)

export function getMenu() {
	function setOpen(o) {
		open = o
	}
	function setDark(h) {
		dark = h
	}
	return {
		get open() {
			return open;
		},
		setOpen,
		get dark() {
			return dark;
		},
		setDark,
	};
}