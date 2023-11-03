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
			`Olá, ${interaction.user}. Boas vindas ao seu ticket!\n\nInicie falando as informações necessárias para agilizar o nosso processo.`,
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
