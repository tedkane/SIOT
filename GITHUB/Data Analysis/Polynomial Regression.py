import numpy
from sklearn.metrics import r2_score
#the data_set is in terms of the polynomial used in the matlab code other iterations and functions have been performed with this code.
import pandas as pd
from numpy import percentile

df = pd.read_csv("LOL.csv")
df.head()
#idenitify objective output and input
data1 = df['Heart Rate']
#for objective function: y = df['Torque (Nmm)']
#for non linear constraint: y = df['Thrust (N)']
data2 = df['Lux']

q5, q95 = percentile(data1, 5), percentile(data1, 95)
iqr = q95 - q5
print('Percentiles: 5th=%.3f, 95th=%.3f, IQR=%.3f' % (q5, q95, iqr))
# calculate the outlier cutoff
cut_off = iqr * 1.5
lower, upper = q5 - cut_off, q95 + cut_off
# identify outliers
outliers = [x for x in data1 if x < lower or x > upper]
print('Identified outliers: %d' % len(outliers))
# remove outliers
outliers_removed = [x for x in data1 if x >= lower and x <= upper]

outliers = [y for y in data2 if y < lower or y > upper]
print('Identified outliers: %d' % len(outliers))
# remove outliers
outliers_removed = [y for y in data2 if y >= lower and y <= upper]
print('Non-outlier observations: %d' % len(outliers_removed))

mymodel = numpy.poly1d(numpy.polyfit(data1, data2, 2))

print(r2_score(data1, mymodel(data2)))