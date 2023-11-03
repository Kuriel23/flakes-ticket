module.exports = async (client, interaction) => {
	interaction
		.reply(
			`\\🔒 |${interaction.user}, esse ticket será arquivado em \`5 segundos\`...`,
		)
		.then(() => {
			setTimeout(() => {
				client.channels.cache
					.get('1169793238350180432')
					.send(
						`ID do usuário que arquivou: ${interaction.user.id}\n\nThread: ${interaction.channel}`,
					);
				interaction.channel.setArchived(true);
			}, 5000);
		});
};
