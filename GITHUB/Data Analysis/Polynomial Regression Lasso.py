
import numpy as np
import pandas as pd
import xlrd
from sklearn import linear_model
from sklearn.model_selection import train_test_split
from sklearn import linear_model
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.linear_model import Ridge
from sklearn.linear_model import Lasso
from sklearn.linear_model import ElasticNet
from sklearn.metrics import mean_squared_error
from sklearn.preprocessing import PolynomialFeatures
from sklearn.pipeline import Pipeline
from sklearn.metrics import mean_squared_error

df = pd.read_csv("2hr.csv")
df.head()
#idenitify objective output and input
X = df[['Heart Rate']]
#for objective function: y = df['Torque (Nmm)']
#for non linear constraint: y = df['Thrust (N)']
y = df['Lux']


from sklearn import preprocessing
# purley for testing prediction vs matlab equation of third degree polynomials
x1 = 120
x2 = 50
x3 = 2
x4 = 6000
input = [0,x1,x2,x3,x4,(x1**2),(x1*x2),(x1*x3),(x1*x4),(x2**2),(x2*x3),(x2*x4),(x3**2),(x3*x4),(x4**2),(x1**3),((x1**2)*x2),((x1**2)*x3),((x1**2)*x4),(x1*(x2**2)),(x1*x2*x3),(x1*x2*x4),(x1*(x3**2)),(x1*x3*x4),(x1*(x4**2)),(x2**3),((x2**2)*x3),((x2**2)*x4),((x3**2)*x2),(x2*x3*x4),(x2*(x4**2)),(x3**3),((x3**2)*x4),((x4**2)*x3),(x4**3)]
print(input)