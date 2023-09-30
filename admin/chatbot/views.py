import os
import json
from langchain.chat_models import ChatOpenAI
from langchain.chains import LLMChain
from langchain.embeddings.openai import OpenAIEmbeddings
from langchain.vectorstores.faiss import FAISS
from langchain.prompts.chat import (
    ChatPromptTemplate,
    SystemMessagePromptTemplate,
    HumanMessagePromptTemplate,
)
from rest_framework import status
from rest_framework.response import Response
from rest_framework.decorators import api_view
from datetime import datetime

with open("secret.json") as secret_file:
    secret = json.load(secret_file)
os.environ["OPENAI_API_KEY"] = secret.get("OPENAI_API_KEY")

@api_view(['GET'])
def answer(request):
    question = request.data.get('question', '')
    birth_year = request.data.get('birthYear', '')
    
    now_year = datetime.now().year
    user_year = now_year - int(birth_year) + 1
    if user_year < 14:
        level_en = 'Child'
    else:
        level_en = 'Student'

    embedding = OpenAIEmbeddings()

    vector_db = FAISS.load_local(f"vector/{level_en}", embedding)
    answer_text = get_response_from_query(vector_db, question, level_en)
    
    response_data = {'answer': answer_text}
    
    return Response(response_data, status = status.HTTP_200_OK)

def get_response_from_query(vector_db, query, target):
    docs = vector_db.similarity_search(query, 3)
    docs_page_content = " ".join([d.page_content for d in docs])

    chat = ChatOpenAI(model_name = "gpt-3.5-turbo-16k", temperature = 1)

    template = """
        You are a helpful assistant that that can ALL answer or explain  to {target}.
        Document retrieved from your DB : {docs}

        Answer the questions referring to the documents which you Retrieved from DB as much as possible.
        If you feel like you don't have enough information to answer the question, say "I don't know".

        Since your answer targets {target}, you should return an answer that is optimized for understanding by {target}.
        """

    system_message_prompt = SystemMessagePromptTemplate.from_template(template)

    human_template = "Answer the following question IN KOREAN: {question}"
    human_message_prompt = HumanMessagePromptTemplate.from_template(human_template)

    chat_prompt = ChatPromptTemplate.from_messages(
        [system_message_prompt, human_message_prompt]
    )

    chain = LLMChain(llm=chat, prompt=chat_prompt)

    response = chain.run(question = query, docs = docs_page_content, target = target)
    response = response.replace("\n", "")
    return response