export function getSearchParam(key: string): string | null {
	return new URLSearchParams(window.location.search).get(key)
}

export function setSearchParam(key: string, value: string): void {
	const url = new URL(window.location.href)
	url.searchParams.set(key, value)
	window.history.pushState({}, '', url)
}

export function deleteSearchParam(key: string): void {
	const url = new URL(window.location.href)
	url.searchParams.delete(key)
	window.history.pushState({}, '', url)
}
