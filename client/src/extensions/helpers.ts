export function isEmpty(obj: Object): boolean {
	return JSON.stringify(obj) === '{}'
}

// export function isEmpty(obj: any): boolean {
// 	return Object.keys(obj).length === 0
// }
