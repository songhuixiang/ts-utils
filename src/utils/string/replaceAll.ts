function escapeRegExp(string: string) {
	return string.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"); // $& means the whole matched string
}

export function replaceAll(string: string, search: string, replace: string) {
	return string.replace(new RegExp(escapeRegExp(search), "g"), replace);
}
