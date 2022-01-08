import pandas as pd
import numpy as np
import matplotlib.pyplot as plt

data = pd.read_csv("for_ml.csv")

data
df = pd.DataFrame(data,columns=['dateTime','luxvalue','hrValue'])
#extract only the nessecarary data in x and y
dataset = df.values
dataset
X = dataset[:,1]
X
Y = dataset[:,2]
Y
#this predicts the thrust being great enough to 91% accuracy
#scale results from 0 to 1
from sklearn import preprocessing
min_max_scaler = preprocessing.MinMaxScaler()
X_scale = X
X_scale

from sklearn.model_selection import train_test_split
#Split into training and validation
X_train, X_val_and_test, Y_train, Y_val_and_test = train_test_split(X_scale, Y, test_size=0.3)
#split validation in two test and valu
X_val, X_test, Y_val, Y_test = train_test_split(X_val_and_test, Y_val_and_test, test_size=0.5)

from keras.models import Sequential
from keras.layers import Dense
model = Sequential([Dense(32, activation='relu', input_shape=(1,)),Dense(32, activation='relu'),Dense(1, activation='sigmoid'),])
model.compile(optimizer='sgd',  loss='binary_crossentropy',   metrics=['accuracy'])

hist = model.fit(X_train, Y_train, batch_size=16, epochs=100, validation_data=(X_val, Y_val))

pred = model.predict(X)
print(pred)
model.evaluate(X_test, Y_test)[1]

#
for layer in model.layers:
    weights = layer.get_weights()



model
print(weights)