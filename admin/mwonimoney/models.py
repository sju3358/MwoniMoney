from django.db import models

class Test(models.Model):
    id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=2)
    def __str__(self):
        return str(self.id)+self.name

    class Meta:
        db_table = 'test'
        # managed = False