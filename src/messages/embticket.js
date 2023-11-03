const discord = require('discord.js');

module.exports = async (client, message) => {
	message.delete();
	const row = new discord.ActionRowBuilder().addComponents(
		new discord.StringSelectMenuBuilder()
			.setCustomId("ticket")
			.setPlaceholder("🖐️ Abrir ticket")
			.addOptions([
				{
					label: "Suporte",
					value: "suporte",
					emoji: "📩",
				},
				{
					label: "Premiações",
					value: "premiacoes",
					emoji: "🎉",
				},
			]),
	);
	const embed = new discord.EmbedBuilder()
		.setColor(client.cor)
		.setTitle('Central de atendimento - Canal Flakes Power')
		.setDescription(
			`Se você tiver alguma dúvida, pergunta ou sugestão, selecione "Suporte" aqui em abaixo para entrar em contato com a equipe!\n\nSe você tiver ganhado alguma premiação em algum evento, selecione "Premiação" aqui no menu abaixo para resgatar!`,
		)
		.setThumbnail("https://cdn.discordapp.com/attachments/1095010254439333928/1169809869893800036/APkrFKaxwyhL1GHo0vS4h4YIW6YEZhvafGqDmFRxeyMLOQs900-c-k-c0x00ffffff-no-rj.png");
	message.channel.send({ embeds: [embed], components: [row] });
};

