const Topic = require('../models/topic.model');

/**
 * GET /topics
 * Lista todos los temas ordenados
 */
exports.getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.findAll({
      order: [
        ['votesCount', 'DESC'],
        ['updatedAt', 'DESC'],
      ],
      raw: true, //solo datos sin funcionalidades
    });

    res.render('topics/index', {
      title: 'Temas de Aprendizaje',
      topics,
    });
  } catch (error) {
    // res.status(500).send('Error al obtener los temas');
    console.error(error);
    res.status(500).send(error.message);
  }
};

/**
 * GET /topics/create
 * Muestra formulario de creación
 */
exports.showCreateForm = (req, res) => {
  res.render('topics/create', { title: 'Crear tema' });
};

/**
 * POST /topics
 * Crea un nuevo tema
 */
exports.createTopic = async (req, res) => {
  const { title, description } = req.body;

  try {
    await Topic.create({ title, description });
    res.redirect('/topics');
  } catch (error) {
    res.status(400).send('Error al crear el tema');
  }
};

/**
 * GET /topics/:id/edit
 * Muestra formulario de edición
 */
exports.showEditForm = async (req, res) => {
  try {
    const topic = await Topic.findByPk(req.params.id, {raw:true});
    if (!topic) return res.status(404).send('Tema no encontrado');

    res.render('topics/edit', {
      title: 'Editar tema',
      topic,
    });
  } catch (error) {
    res.status(500).send('Error al cargar el tema');
  }
};

/**
 * POST /topics/:id
 * Actualiza un tema
 */
exports.updateTopic = async (req, res) => {
  const { title, description } = req.body;

  try {
    await Topic.update(
      { title, description },
      { where: { id: req.params.id } }
    );

    res.redirect('/topics');
  } catch (error) {
    res.status(400).send('Error al actualizar el tema');
  }
};

/**
 * POST /topics/:id/delete
 * Elimina un tema
 */
exports.deleteTopic = async (req, res) => {
  try {
    await Topic.destroy({ where: { id: req.params.id } });
    res.redirect('/topics');
  } catch (error) {
    res.status(500).send('Error al eliminar el tema');
  }
};

/**
 * POST /topics/:id/vote
 * vota un tema
 */
exports.voteTopic = async (req, res) => {
  const { id } = req.params;
  const { value } = req.body; // +1 o -1

  try {
    const topic = await Topic.findByPk(id);

    if (!topic) {
      return res.status(404).json({ message: 'Tema no encontrado' });
    }

    // Evitar votos negativos
    if (topic.votesCount + value < 0) {
      return res.status(400).json({ message: 'Los votos no pueden ser negativos' });
    }

    topic.votesCount += value;
    await topic.save();

    res.json({
      id: topic.id,
      votesCount: topic.votesCount,
      updatedAt: topic.updatedAt,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al votar' });
  }
};
