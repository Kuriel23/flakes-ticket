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
		.setTitle('Central de atendimento do Flakes Power')
		.setDescription(
			`Agora, com o sistema de Atendimento, você tem a oportunidade de obter suporte e tirar dúvidas de premiações. Queremos garantir que sua voz seja ouvida e seus problemas resolvidos da melhor maneira possível. Conte conosco para uma experiência ainda mais satisfatória.`,
		);
	message.channel.send({ embeds: [embed], components: [row] });
};

