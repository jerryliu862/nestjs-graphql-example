import {
  Body,
  Controller,
  Get,
  NotFoundException,
  Param,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { ChatsService } from './chats.service';
import { Configuration, OpenAIApi } from 'openai';
import { Request, Response } from 'express';

@Controller('chats')
export class ChatController {
  private openai: OpenAIApi;
  private configuration: Configuration;

  constructor(private readonly chatsService: ChatsService) {
    // this.configuration = new Configuration({
    //   apiKey: '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',
    // });
    // this.openai = new OpenAIApi(this.configuration);
  }

  @Get()
  async getAllTeams() {
    const teams = await this.chatsService.findAll();

    return { teams };
  }

  @Post()
  async sentQuestion(@Req() req: Request, @Res() res: Response) {
    // console.log(text);

    // const configuration = new Configuration({
    //   apiKey: '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',
    // });
    // const openai = new OpenAIApi(configuration);

    // const chatCompletion = await openai.createChatCompletion({
    //   model: 'gpt-3.5-turbo',
    //   messages: [{ role: 'user', content: 'Hello world' }],
    // });
    // console.log(chatCompletion.data.choices[0].message);

    try {
      const { Configuration, OpenAIApi } = require('openai');
      const configuration = new Configuration({
        apiKey: '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',
      });
      const openai = new OpenAIApi(configuration);

      const question = req.body.question;
      console.log('question:', question);
      await openai
        .createChatCompletion({
          model: 'gpt-3.5-turbo',
          messages: [{ role: 'user', content: question }],

          // max_tokens: 7,
        })
        .then((response) => {
          console.log(response.data.choices[0].message);
          res.status(200).send({ bot: response.data.choices[0].message });
        })
        .catch((err) => {
          console.log(err);
          res.status(400).send({ message: err.message });
        });
    } catch (error) {
      res.status(500).send(error || 'Something went wrong');
    }
  }

  @Post()
  async create(@Req() req: Request, @Res() res: Response): Promise<any> {
    try {
      // Process the request
      // Access the request data through `req.body`, `req.params`, or `req.query`

      // Perform any necessary operations based on the request data

      // Return a response
      return res
        .status(200)
        .json({ message: 'Data successfully received and processed' });
    } catch (error) {
      // Handle any errors that occur during processing

      // Return an error response
      return res
        .status(500)
        .json({ error: 'An error occurred while processing the request' });
    }
  }
}
