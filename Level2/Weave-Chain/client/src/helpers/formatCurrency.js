/* This arrow func is used to set the number into currency format */

const formatCurrency = (num) => {
	if (!num) return ''
	const formatted = num.toLocaleString('id-ID', {
		minimumFractionDigits: 0,
		maximumFractionDigits: 2,
	})
	return formatted
}
export default formatCurrency