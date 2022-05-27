# oceansML

### Machine learning tactics on our ocean data project.

This project includes datasets on fish caught, fishing vessel traffic, marine debris, and eutrophication. After analysis, we did some k-means clustering on the marine debris data and predictive modeling on a subset of the fishing data.
## Tuna Catch

Objective
     To show visually where different nations fish for tuna and tuna-like species. The data was sourced from the FIRMS Global Tuna Atlas (GTA) website of the United Nations’ Food and Agriculture Organization (FAO).

Source file
global_catch_5deg_1m_firms_level0_view.csv
-	Global monthly catch of tuna and tuna-like species
-	Data range: 1950 to 2019
-	Aggregated by statistical squares of 5° longitude and latitude

Steps
1. Raw file was imported and saved to a dataframe
2. Removed unwanted data from the “fishing fleet” column and renamed the remaining data to align with the ISO alpha-3 country code naming format
3. Renamed the catch units to Metric ton and Number of fish
4. Converted the species identifier from the 3-letter code to its English name
5.  Converted the species group identifier from the code being used by FIRMS to its English equivalent
6. Grouped the fishing gear types to their gear categories
7. Converted the country identifier from the ISO alpha-3 country code to the English country name
8. Filtered the dataframe to remove the information prior to 1990
9. Created and inserted dummy data for months where there is no recorded catch data
10. Exported the dataframe to a csv file
11. Imported processed csv file into Tableau and generated the map visualization

Acronyms
FAO - Food And Agriculture Organization Of The United Nations
FIRMS - Fisheries and Resources Monitoring System Partnership 
NEI – Not Enough Information

Source to cite
Cite this content as:
© FAO 2022. FIRMS Global Tuna Atlas (GTA). Fisheries and Aquaculture Division [online]. Rome. [Cited Tuesday, May 24th 2022]. 
https://www.fao.org/fishery/en/collection/firms-tuna-atlas

## Boats and Trawlers

Objective
     To display via a map the locations where fishing boats and trawlers travel and fish. The data was sourced from the Global Fishing Watch Github repository.

Source file
drifting_longlines-20220521T203917Z-001.zip
-	Collection of 108 JSON format files, each one containing a specific ship’s location and fishing activity history	
-	Data range: 2012 to 2016

Steps
1. The 108 JSON files was imported and combined to a single dataframe
2. The timestamp information was converted to a date only format
3. Aggregated data on a per ship, per day basis
4. Exported the dataframe to a csv file
5. Imported processed csv file into Tableau and generated the map visualization

## Marine Debris

To use unsupervised learning algorithms on the marine debris dataset, we began by making sure that the features were numeric and on similar scales. Perform the following data transformations:
Data Preparation:
Dropped “Id”, “time, “lat”,  “long”, and “month” columns from the dataframe.
The  “itemname”, “material” and “location columns contained categorical data; I transformed them to a numerical value. In this case, transforming them using pd.get_dummies()
Standardized my dataset so that columns that contain larger values did not unduly influence the outcome.
We decided to filter marine debris data  based on the year and cluster by the available features.
Dimensionality Reduction
Created dummy variables above dramatically increased the number of features in my dataset. Performed dimensionality reduction with PCA.
Rather than specify the number of principal components when we instantiate the PCA model, we stated the desired explained variance. We used PCA(n_components=0.90). For this project, preserved 90% of the explained variance in dimensionality reduction.
Next, we further reduced the dataset dimensions with t-SNE and visually inspect the results. To accomplish this task, ran t-SNE on the principal components: the output of the PCA transformation. Then created a scatter plot of the t-SNE output. Observed whether there were distinct clusters or not.
Cluster Analysis with k-Means
·        Created an elbow plot to identify the best number of clusters. Used a for-loop to determine the inertia for each k between 1 through 10. Determined, where the elbow of the plot is, and at which value of k it appears.
Marine Debris Clusters
We cannot showcase any meaningful result from the Marine Debris Cluster from 2018 because there are too few data points; however, in 2019  you can see medium sized clusters. From 2019 to 2020 a global catastrophe occurred: Covid-19 which dominated the following year and is still prevalent today. Clean-up efforts were greatly hindered due to this major event. The reports of marine debris could have been greatly effected by this showcasing the distinction between the sizing of the clusters from 2019-2020. Larger clusters are seen in the year 2021 possibly due to the easing of restrictions of being outside in certain areas, and parts of the world. For 2022, the clusters get smaller possibly due to more clean-up efforts being made after more time passing. Moreover, how much marine debris there is could be dependent on the marine debris material type and the location or country where it is cleaned or located.

## Predictive Modeling

Regressor is exact and tries to make a curve. If there’s more then 10 values; this method is not recommended. Due to the uniqueness of China’s data, Regressor can be used and is quite accurate. For all other data however, Classifier needs to be used. 
China’s data was selected as it gives us unique values we can examine while the Classifier would give us very large ranges that can be less readily visualized. Also due to the kind of data, heavy skews make the Classified Data very repetitive as the predictions would all go into the lowest bins. The regressor for China on the other hand, lets us see each individual category more uniquely and dynamically and is better for demonstration purposes.    

**Bins for the Classifier use the KBinsDigitizer. This is from sklearn’s preprocessing library and splits up the data based on 3 arguments. These are number of bins, encode and strategy. Ordinal must be used for encoding because it’s the format that will return the data as numeric which is needed for testing data. The strategy is more unique as there are 3 options: uniform, quantile and kmeans. Quantile will split up the data the same way we would for box and whiskers plot. For this data is was the least accurate due to the heavy forward skew. Uniform is the most accurate (95-99%) as it ensure the data is split into even widths based on the n-bins. However this created very large bins which resulted in all results going into the lowest category as those are by far the most common. The last option is kmeans. This still has fairly high accuracy(93%) but less then uniform. However, it calculates its ranges based on the closest centroid a value has. As a result, its bins are by far the most accurate and representative of the data. However, this does not change the outcome much. Predictions overwhelmingly go into the lowest bin. 

Why is this? Heavy, heavily skewed data due to the filters. Countries individually typically don’t fish much per area but have one or two spots that they prefer, usually near their coast line. As a result, when the model trains and tests as a whole, it is heavily biased to the lowest bin. In the case of Spain for example, this bin is 0 tons to 15k tons which is a very large category. 

### Results: The sums are all the same across the board
Possibilities: programming error. Heavy heavy data skews that the model and manual testing can’t fully capture made this very difficult to accurately represent so it is creating defaults. Many, many low values (under 1) exist in the data but so do very high values in the millions. In all cases, the KBinsDigitizer made its first category very large (0 + some very large number). There is also possible errors in the for loop created to make and test them rapidly without needing to do them manually. 

Carrying capacity: we are hitting the limit of how big the human population can possibly be. With birth rates dropping or plateauing, demand is not likely to increase because there’s not new mouths to feed but it’s not likely to decrease any time soon as people are dying less as well. 

Demand is stable: the market for food and fish by extension will always be in demand but it’s not likely that there’ll be a sudden rise either barring another population explosion. We are past most large country’s ‘boom’ and headed towards population stabilization and declines in some regions. 
 
Overfishing: with wild fish populations continuing to decline, bans and limits on how much can be fished have been put in place. Assuming these are followed, they would put an upper limit on how much will be fished per year. With alternatives like fish farming becoming increasingly prevalent to restock native populations or feed us, it’s possible wild catch will not increase as any lack of catch is made up for by fish farms.  

### Reframe question for future: focus more on looking for locations of highest yield and searching for globally over exploited areas 
