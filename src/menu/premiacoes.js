const discord = require('discord.js');

module.exports = async (client, interaction) => {
	interaction.deferReply({ ephemeral: true });
	const tagger = interaction.user.tag;

	const embed = new discord.EmbedBuilder()
		.setAuthor({
			name: interaction.guild.name,
			iconURL: interaction.guild.iconURL({
				dynamic: true,
			}),
		})
		.setColor(client.cor)
		.setDescription(
			`Olá, ${interaction.user}. Boas vindas ao seu ticket!\n\nNeste canal você poderá solicitar o prêmio que foi resgatado na lojinha.\n\nPara agilizar o processo, seja claro com o que deseja para que possamos te atender da melhor maneira possível.`,
		);

	const botao = new discord.ActionRowBuilder().addComponents(
		new discord.ButtonBuilder()
			.setCustomId('ct')
			.setEmoji('🔒')
			.setLabel('Fechar Ticket')
			.setStyle(2),
	);

	const fetchActiveThreads =
		await interaction.channel.threads.fetchActive(true);
	const findThread = fetchActiveThreads.threads.find(
		c => c.name === `${tagger} | Premiações`,
	);
	if (findThread)
		return interaction.editReply({
			content: `Você já possui um ticket aberto em ${findThread}.`,
			ephemeral: true,
		});

	interaction.channel.threads
		.create({
			name: `${tagger} | Premiações`,
			autoArchiveDuration: discord.ThreadAutoArchiveDuration.ThreeDays,
			reason: 'Atendimento criado.',
			type: discord.ChannelType.PrivateThread,
			invitable: false,
		})
		.then(c => {
			c.members.add(interaction.user.id);
			c.send({
				content: '<@&485488846990213121> <@&1169697807347761263>',
				embeds: [embed],
				components: [botao],
			});
			client.channels.cache
					.get('1169793238350180432')
					.send(
						`ID do usuário que abriu: ${interaction.user.id}\n\nThread: ${c}`,
					);
			return interaction.editReply({
				content: `Seu ticket foi aberto em ${c}.`,
				ephemeral: true,
			});
		})
		.catch(() => {
			return interaction.editReply({
				content: 'Ocorreu um erro. Tente novamente mais tarde.',
				ephemeral: true,
			});
		});
};
