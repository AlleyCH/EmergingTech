const Prompt = require('../models/Prompt.model.server');

    const getPrompts = async () => { return await Prompt.find()};

    const addPrompt  = async (parent, args) => 
    {const prompt = new Prompt(args);
    return await prompt.save()};      
    
    const deletePrompt = async (parent, args) => {
        try {
          return await Prompt.deleteOne({ chatId: args.chatId });
        } catch (error) {
          throw new Error('Error deleting prompt: ' + error.message);
        }
      };
module.exports = {
    getPrompts,
    addPrompt,
    deletePrompt,    
};

/*
//Implement functionality for add, list, and delete operations.
const Prompt = require('../models/Prompt.model.server');

const getPrompts = async () => {
    //
    const prompts = await Student.find().exec();
    if (!prompts) {
      throw new Error('Error');
    }
    return prompts;
  };
  //
  const getPromptById = async (root, args) => {
    //
    const promptInfo = await Student.findById(args.id).exec();
    if (!promptInfo) {
      throw new Error('Error');
    }
    return promptInfo;
  };
  // 
  const addPrompt = async (root, params) => {
      const promptModel = new Prompt(params);
      const newPrompt = await promptModel.save();
      if (!newPrompt) {
        throw new Error('Error');
      }
      return newPrompt
  }
  // 
  const updatePrompt = async (parent, args) => {
      console.log('args in update prompt :', args);
      try {
        const { id, ...update } = args;
        const options = { new: true };
        const updatedPrompt = await Prompt.findByIdAndUpdate(id, update, options);
    
        if (!updatedPrompt) {
          throw new Error(`prompt with ID ${id} not found`);
        }
    
        return updatedPrompt;
      } catch (error) {
        console.error('Error updating prompt:', error);
        throw new Error('Failed to update prompt');
      }
    };
  
    const deletePrompt = async (root, params) => {
      try {
        const deletedPrompt = await Prompt.findOneAndRemove({ email: params.email }).exec();
    
        if (!deletedPrompt) {
          throw new Error(`prompt with email ${params.email} not found`);
        }
    
        return deletedPrompt;
      } catch (error) {
        console.error('Error deleting prompt:', error);
        throw new Error('Failed to delete prompt');
      }
    };
  // Make resolvers available to other modules
  module.exports = {
      getPrompts: getPrompts,
      getPromptById: getPromptById,
      addPrompt: addPrompt,
      updatePrompt: updatePrompt,
      deletePrompt: deletePrompt,
  };  
*/