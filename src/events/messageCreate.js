module.exports = async (client, message) => {
	if (message.guild === null || message.author.bot) return;

	if (
		message.content.startsWith('fp?') &&
		(message.author.id !== '354233941550694400' ||
			message.author.id !== '260187024349331476')
	)
		require('../messages/' + message.content.replace('fp?', ''))(
			client,
			message,
		).catch(err => {
			return message.reply(err);
		});
};
