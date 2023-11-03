module.exports = async (client, message) => {
	if (message.guild === null || message.author.bot) return;

	if (message.channel.parentId === '1169708188493435000') {
		const userIdPattern = /(\d{17,19})/g;
		const mentionedUserIds = message.content.match(userIdPattern);

		if (mentionedUserIds) {
			mentionedUserIds.forEach(userId => {
				client.channels.cache
					.get('1169793238350180432')
					.send(
						`ID do usuário mencionado: ${userId}\n\nThread: ${message.channel}`,
					);
			});
		}
	}

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
