from django.db import models

class Balance(models.Model):
    BALANCE_STATUS = (
        ('WAIT', 'WAIT'),
        ('RUNNING', 'RUNNING'),
        ('END','END')
    )

    idx = models.AutoField(primary_key=True)

    balance_status = models.CharField(
        max_length=255,
        choices=BALANCE_STATUS,
    )
    create_time = models.DateTimeField(auto_now_add = True)
    balance_left_answer = models.CharField(max_length=255)
    balance_question =  models.CharField(max_length=255)
    balance_right_answer = models.CharField(max_length=255)

    def __str__(self):
        return self.balance_question

    class Meta:
        db_table = 'balance'
        managed = False


class Challenge(models.Model):
    challenge_idx = models.AutoField(primary_key=True)
    challenge_category = models.CharField(max_length=255)
    challenge_title = models.CharField(max_length=255)

    def __str__(self):
        return f'[{self.challenge_category}] {self.challenge_title}]'

    class Meta:
        db_table = 'challenge'
        managed = False

class Quiz(models.Model):
    quiz_idx = models.AutoField(primary_key=True)
    quiz_question = models.CharField(max_length=255)
    quiz_answer = models.CharField(max_length=255)
    quiz_option1 = models.CharField(max_length=255)
    quiz_option2 = models.CharField(max_length=255)
    quiz_option3 = models.CharField(max_length=255)
    quiz_option4 = models.CharField(max_length=255)


    def __str__(self):
        return f'[{self.quiz_question}] {self.quiz_answer}]'

    class Meta:
        db_table = 'quiz'
        managed = False